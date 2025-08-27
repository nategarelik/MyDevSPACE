import { EventEmitter } from 'eventemitter3';
import { BMADProject, BMADConfig, BMADAgent, BMADTask } from './types';
import { AgentManager } from './agents/AgentManager';
import { TaskSharder } from './services/TaskSharder';
import { CostOptimizer } from './services/CostOptimizer';
import { ContextManager } from './services/ContextManager';
import { IntelligentPlanningPhase } from './phases/IntelligentPlanningPhase';
import { ContextEngineeredDevelopmentPhase } from './phases/ContextEngineeredDevelopmentPhase';

interface ExecutionResult {
  success: boolean;
  planningResult?: any;
  developmentResult?: any;
  totalDuration: number;
  costOptimization: any;
  errors?: Error[];
}

/**
 * BMAD Orchestrator
 * 
 * Coordinates the two-phase BMAD development process:
 * - Phase 1: Intelligent Planning (requirements → architecture → PRDs)
 * - Phase 2: Context-Engineered Development (PRDs → story files with context)
 */
export class BMADOrchestrator extends EventEmitter {
  private config: BMADConfig;
  private agentManager: AgentManager;
  private taskSharder: TaskSharder;
  private costOptimizer: CostOptimizer;
  private contextManager: ContextManager;
  private planningPhase: IntelligentPlanningPhase;
  private developmentPhase: ContextEngineeredDevelopmentPhase;
  private isRunning = false;
  private currentProject?: BMADProject;

  constructor(config: BMADConfig) {
    super();
    this.config = config;
    
    // Initialize services
    this.agentManager = new AgentManager(config.agents);
    this.taskSharder = new TaskSharder();
    this.costOptimizer = new CostOptimizer();
    this.contextManager = new ContextManager();
    
    // Initialize phases
    this.planningPhase = new IntelligentPlanningPhase(
      this.agentManager,
      this.contextManager,
      this.costOptimizer
    );
    
    this.developmentPhase = new ContextEngineeredDevelopmentPhase(
      this.agentManager,
      this.taskSharder,
      this.contextManager
    );

    this.setupEventHandlers();
    console.log('🚀 BMAD Orchestrator initialized');
  }

  /**
   * Execute the complete BMAD process
   */
  public async execute(project: BMADProject): Promise<ExecutionResult> {
    if (this.isRunning) {
      throw new Error('BMAD Orchestrator is already running');
    }

    console.log(`🎯 Starting BMAD execution for: ${project.name}`);
    console.log(`📋 Project description: ${project.description}`);
    
    this.isRunning = true;
    this.currentProject = project;
    const startTime = Date.now();
    const errors: Error[] = [];

    try {
      this.emit('executionStarted', project);
      
      // Phase 1: Intelligent Planning
      console.log('\n=== Phase 1: Intelligent Planning ===');
      const planningResult = await this.executePlanningPhase(project);
      
      // Update project with planning results
      project.requirements = planningResult.requirements;
      project.architecture = planningResult.architecture;
      project.currentPhase = 'development';
      
      this.emit('planningCompleted', planningResult);

      // Track planning phase costs
      await this.costOptimizer.trackPhaseCompletion(
        'planning',
        Date.now() - startTime,
        planningResult.tokenUsage
      );

      // Phase 2: Context-Engineered Development
      console.log('\n=== Phase 2: Context-Engineered Development ===');
      const developmentResult = await this.executeDevelopmentPhase(project);
      
      // Update project status
      project.currentPhase = 'completed';
      project.updated = new Date();
      
      this.emit('developmentCompleted', developmentResult);

      // Track development phase costs
      await this.costOptimizer.trackPhaseCompletion(
        'development',
        Date.now() - startTime,
        developmentResult.tokenUsage
      );

      // Generate final optimization report
      const costOptimization = await this.costOptimizer.generateOptimizationReport();
      
      const totalDuration = Date.now() - startTime;
      
      const result: ExecutionResult = {
        success: true,
        planningResult,
        developmentResult,
        totalDuration,
        costOptimization,
        errors: errors.length > 0 ? errors : undefined
      };

      console.log(`\n✅ BMAD execution completed successfully in ${totalDuration}ms`);
      console.log(`💰 Cost optimization achieved: ${costOptimization.tokenUsage.reductionPercentage}% token reduction`);
      console.log(`📊 Context preservation: ${developmentResult.contextPreservation}%`);
      
      this.emit('executionCompleted', result);
      return result;

    } catch (error) {
      console.error('❌ BMAD execution failed:', error);
      errors.push(error as Error);
      
      const failureResult: ExecutionResult = {
        success: false,
        totalDuration: Date.now() - startTime,
        costOptimization: await this.costOptimizer.generateOptimizationReport(),
        errors
      };
      
      this.emit('executionFailed', failureResult);
      return failureResult;
      
    } finally {
      this.isRunning = false;
      this.currentProject = undefined;
    }
  }

  /**
   * Execute Phase 1: Intelligent Planning
   */
  private async executePlanningPhase(project: BMADProject): Promise<any> {
    try {
      return await this.planningPhase.execute(project);
    } catch (error) {
      console.error('❌ Planning Phase failed:', error);
      throw new Error(`Planning Phase execution failed: ${error}`);
    }
  }

  /**
   * Execute Phase 2: Context-Engineered Development
   */
  private async executeDevelopmentPhase(project: BMADProject): Promise<any> {
    try {
      return await this.developmentPhase.execute(project);
    } catch (error) {
      console.error('❌ Development Phase failed:', error);
      throw new Error(`Development Phase execution failed: ${error}`);
    }
  }

  /**
   * Get current execution status
   */
  public getStatus(): any {
    return {
      isRunning: this.isRunning,
      currentProject: this.currentProject ? {
        id: this.currentProject.id,
        name: this.currentProject.name,
        phase: this.currentProject.currentPhase
      } : null,
      agents: this.agentManager.getAgentSummary(),
      costOptimization: this.costOptimizer.getCurrentStats(),
      contextStats: this.contextManager.getContextStats()
    };
  }

  /**
   * Get detailed orchestrator metrics
   */
  public async getMetrics(): Promise<any> {
    const agentStatus = this.agentManager.getAgentStatus();
    const costOptimization = await this.costOptimizer.generateOptimizationReport();
    const contextMetrics = this.contextManager.getContextPreservationMetrics();
    const shardingStats = this.taskSharder.getShardingStats();
    
    return {
      agents: {
        summary: this.agentManager.getAgentSummary(),
        detailed: agentStatus
      },
      costOptimization,
      context: contextMetrics,
      taskSharding: shardingStats,
      orchestration: {
        totalExecutions: this.listenerCount('executionCompleted'),
        successRate: this.calculateSuccessRate(),
        averageExecutionTime: this.calculateAverageExecutionTime()
      }
    };
  }

  /**
   * Pause current execution (if possible)
   */
  public async pause(): Promise<boolean> {
    if (!this.isRunning) {
      return false;
    }
    
    console.log('⏸️ Pausing BMAD execution...');
    this.emit('executionPaused');
    
    // In a real implementation, this would coordinate with phases to pause gracefully
    return true;
  }

  /**
   * Resume paused execution
   */
  public async resume(): Promise<boolean> {
    console.log('▶️ Resuming BMAD execution...');
    this.emit('executionResumed');
    
    // In a real implementation, this would coordinate with phases to resume
    return true;
  }

  /**
   * Cancel current execution
   */
  public async cancel(): Promise<boolean> {
    if (!this.isRunning) {
      return false;
    }
    
    console.log('🛑 Cancelling BMAD execution...');
    
    try {
      // Cleanup and shutdown services gracefully
      await this.shutdown();
      this.emit('executionCancelled');
      return true;
    } catch (error) {
      console.error('❌ Error during cancellation:', error);
      return false;
    }
  }

  /**
   * Get configuration
   */
  public getConfig(): BMADConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  public updateConfig(updates: Partial<BMADConfig>): void {
    this.config = { ...this.config, ...updates };
    console.log('🔧 BMAD configuration updated');
    this.emit('configUpdated', this.config);
  }

  /**
   * Get all available agents
   */
  public getAgents(): BMADAgent[] {
    return this.agentManager.getAllAgents();
  }

  /**
   * Create a new project with validation
   */
  public async createProject(projectData: Partial<BMADProject>): Promise<BMADProject> {
    if (!projectData.name || !projectData.description) {
      throw new Error('Project name and description are required');
    }

    const project: BMADProject = {
      id: projectData.id || `project_${Date.now()}`,
      name: projectData.name,
      description: projectData.description,
      requirements: projectData.requirements || {
        functionalRequirements: [],
        nonFunctionalRequirements: [],
        businessGoals: [],
        technicalConstraints: [],
        stakeholders: []
      },
      architecture: projectData.architecture || {
        id: `arch_${Date.now()}`,
        patterns: [],
        components: [],
        dataFlow: { nodes: [], edges: [], patterns: [] },
        deployment: {
          environment: 'cloud',
          platform: 'AWS',
          scaling: { strategy: 'auto', triggers: [], limits: {} },
          monitoring: {
            metrics: [],
            logging: { level: 'info', destinations: [], retention: '30d' },
            alerting: { rules: [], channels: [] }
          },
          cicd: { pipeline: [], triggers: [], environments: [] }
        },
        security: {
          authentication: { methods: [], providers: [], mfa: false, sessionManagement: '' },
          authorization: { model: 'rbac', policies: [] },
          encryption: {
            atRest: { algorithm: 'AES-256', keySize: 256, provider: 'AWS KMS' },
            inTransit: { algorithm: 'TLS 1.3', keySize: 256, provider: 'CA' },
            keyManagement: 'AWS KMS'
          },
          compliance: []
        },
        performance: { targets: [], bottlenecks: [], optimizations: [] }
      },
      currentPhase: 'planning',
      created: new Date(),
      updated: new Date(),
      metadata: projectData.metadata
    };

    // Validate project if configured
    if (this.config.project.requirementsValidation) {
      await this.validateProject(project);
    }

    console.log(`📋 Created new BMAD project: ${project.name}`);
    this.emit('projectCreated', project);
    
    return project;
  }

  /**
   * Validate project structure and requirements
   */
  public async validateProject(project: BMADProject): Promise<boolean> {
    const issues = [];

    // Basic validation
    if (!project.name || project.name.length < 3) {
      issues.push('Project name must be at least 3 characters');
    }
    
    if (!project.description || project.description.length < 10) {
      issues.push('Project description must be at least 10 characters');
    }

    // Requirements validation (if configured)
    if (this.config.project.requirementsValidation) {
      if (project.requirements.functionalRequirements.length === 0) {
        issues.push('At least one functional requirement is required');
      }
    }

    // Architecture validation (if configured)
    if (this.config.project.architectureValidation) {
      if (project.architecture.components.length === 0) {
        issues.push('At least one architectural component is required');
      }
    }

    if (issues.length > 0) {
      console.warn('⚠️ Project validation issues:', issues);
      throw new Error(`Project validation failed: ${issues.join(', ')}`);
    }

    console.log('✅ Project validation passed');
    return true;
  }

  /**
   * Setup event handlers for internal coordination
   */
  private setupEventHandlers(): void {
    // Cost optimizer events
    this.costOptimizer.on('significantSavings', (data) => {
      console.log(`💰 Significant cost savings detected: $${data.saved.toFixed(2)} in ${data.phase}`);
      this.emit('costSavingsAlert', data);
    });

    // Agent manager events
    this.agentManager.on('taskCompleted', (agents, task, result) => {
      console.log(`✅ Task completed by ${agents.map((a: BMADAgent) => a.name).join(', ')}: ${task.title}`);
      this.emit('taskCompleted', { agents, task, result });
    });

    this.agentManager.on('taskFailed', (agents, task, error) => {
      console.error(`❌ Task failed: ${task.title}`, error);
      this.emit('taskFailed', { agents, task, error });
    });
  }

  // Helper methods for metrics calculation
  private calculateSuccessRate(): number {
    // Simplified calculation - in real implementation would track success/failure history
    return 95; // Default high success rate
  }

  private calculateAverageExecutionTime(): number {
    // Simplified calculation - in real implementation would track execution times
    return 300000; // 5 minutes average
  }

  /**
   * Graceful shutdown of the orchestrator
   */
  public async shutdown(): Promise<void> {
    console.log('🔄 Shutting down BMAD Orchestrator...');
    
    this.isRunning = false;
    
    // Shutdown all services
    await this.agentManager.shutdown();
    this.contextManager.clearCache();
    this.costOptimizer.clearHistory();
    
    // Clear all listeners
    this.removeAllListeners();
    
    console.log('✅ BMAD Orchestrator shutdown complete');
  }

  /**
   * Health check for the orchestrator and all services
   */
  public async healthCheck(): Promise<any> {
    return {
      orchestrator: {
        status: this.isRunning ? 'running' : 'idle',
        version: this.config.version,
        uptime: Date.now()
      },
      services: {
        agentManager: {
          agents: this.agentManager.getAllAgents().length,
          activeAgents: this.agentManager.getAllAgents().filter(a => a.status === 'active').length
        },
        contextManager: {
          totalContexts: this.contextManager.getContextStats().totalContexts,
          cacheUtilization: this.contextManager.getContextStats().cacheUtilization
        },
        costOptimizer: {
          totalOperations: this.costOptimizer.getCurrentStats().totalOperations,
          totalSavings: this.costOptimizer.getCurrentStats().totalSavings
        },
        taskSharder: {
          totalTasksSharded: this.taskSharder.getShardingStats().totalTasksSharded,
          averageShardsPerTask: this.taskSharder.getShardingStats().averageShardsPerTask
        }
      }
    };
  }
}