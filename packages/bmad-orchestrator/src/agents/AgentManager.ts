import { EventEmitter } from 'eventemitter3';
import { BMADAgent, BMADTask, BMADAgentRole, AgentConfig } from '../types';

interface AgentAssignment {
  task: BMADTask;
  agents: BMADAgent[];
  coordination: CoordinationStrategy;
  createdAt: Date;
}

interface CoordinationStrategy {
  type: 'parallel' | 'sequential' | 'hierarchical' | 'collaborative';
  leader?: string;
  workflow: WorkflowStep[];
}

interface WorkflowStep {
  agent: string;
  action: string;
  dependencies: string[];
  timeout: number;
}

export class AgentManager extends EventEmitter {
  private agents = new Map<string, BMADAgent>();
  private assignments = new Map<string, AgentAssignment>();
  private config: AgentConfig;
  private performanceHistory = new Map<string, number[]>();
  private agentLoadBalancer = new Map<string, number>();

  constructor(config: AgentConfig) {
    super();
    this.config = config;
    this.initializeBMADAgents();
  }

  /**
   * Initialize all BMAD specialized agents
   */
  private initializeBMADAgents(): void {
    const agentDefinitions = [
      {
        id: 'analyst',
        name: 'Business Analyst',
        role: 'analyst' as BMADAgentRole,
        capabilities: [
          'Requirements gathering',
          'Stakeholder analysis',
          'Business process modeling',
          'Gap analysis',
          'User story creation'
        ]
      },
      {
        id: 'product-manager',
        name: 'Product Manager',
        role: 'product-manager' as BMADAgentRole,
        capabilities: [
          'Product roadmap planning',
          'Feature prioritization',
          'Stakeholder management',
          'Market analysis',
          'Product strategy'
        ]
      },
      {
        id: 'architect',
        name: 'System Architect',
        role: 'architect' as BMADAgentRole,
        capabilities: [
          'System architecture design',
          'Technology selection',
          'Scalability planning',
          'Integration design',
          'Performance architecture'
        ]
      },
      {
        id: 'scrum-master',
        name: 'Scrum Master',
        role: 'scrum-master' as BMADAgentRole,
        capabilities: [
          'Story file creation',
          'Sprint planning',
          'Context preservation',
          'Task coordination',
          'Process optimization'
        ]
      },
      {
        id: 'developer',
        name: 'Senior Developer',
        role: 'developer' as BMADAgentRole,
        capabilities: [
          'Code implementation',
          'Technical design',
          'Code review',
          'Debugging',
          'Performance optimization'
        ]
      },
      {
        id: 'tester',
        name: 'QA Engineer',
        role: 'tester' as BMADAgentRole,
        capabilities: [
          'Test planning',
          'Test automation',
          'Quality assurance',
          'Bug reporting',
          'Performance testing'
        ]
      },
      {
        id: 'devops',
        name: 'DevOps Engineer',
        role: 'devops' as BMADAgentRole,
        capabilities: [
          'Deployment automation',
          'Infrastructure management',
          'CI/CD pipeline',
          'Monitoring setup',
          'Security configuration'
        ]
      },
      {
        id: 'designer',
        name: 'UI/UX Designer',
        role: 'designer' as BMADAgentRole,
        capabilities: [
          'User interface design',
          'User experience planning',
          'Prototyping',
          'Design system creation',
          'Accessibility design'
        ]
      }
    ];

    agentDefinitions.forEach(agentDef => {
      const agent: BMADAgent = {
        id: agentDef.id,
        name: agentDef.name,
        role: agentDef.role,
        capabilities: agentDef.capabilities,
        status: 'active',
        performance: {
          tasksCompleted: 0,
          averageTime: 0,
          successRate: 100,
          qualityScore: 85
        }
      };

      this.agents.set(agentDef.id, agent);
      this.agentLoadBalancer.set(agentDef.id, 0);
    });

    console.log(`🤖 Initialized ${this.agents.size} BMAD agents`);
  }

  /**
   * Get agents by required roles
   */
  public async getAgentsByRoles(roles: BMADAgentRole[]): Promise<BMADAgent[]> {
    const selectedAgents: BMADAgent[] = [];
    
    for (const role of roles) {
      const agent = this.selectBestAgentForRole(role);
      if (agent) {
        selectedAgents.push(agent);
      } else {
        console.warn(`⚠️ No agent available for role: ${role}`);
      }
    }
    
    return selectedAgents;
  }

  /**
   * Assign agents to a task with coordination strategy
   */
  public async assignAgentsToTask(
    task: BMADTask,
    agents: BMADAgent[]
  ): Promise<AgentAssignment> {
    const coordinationStrategy = this.determineCoordinationStrategy(task, agents);
    
    const assignment: AgentAssignment = {
      task,
      agents,
      coordination: coordinationStrategy,
      createdAt: new Date()
    };
    
    // Update agent status
    agents.forEach(agent => {
      agent.status = 'busy';
      agent.currentTask = task;
      const currentLoad = this.agentLoadBalancer.get(agent.id) || 0;
      this.agentLoadBalancer.set(agent.id, currentLoad + 1);
    });
    
    this.assignments.set(task.id, assignment);
    
    console.log(`👥 Assigned ${agents.length} agents to task: ${task.title}`);
    console.log(`🎯 Coordination strategy: ${coordinationStrategy.type}`);
    
    return assignment;
  }

  /**
   * Execute collaborative task with multiple agents
   */
  public async executeCollaborativeTask(assignment: AgentAssignment): Promise<any> {
    const { task, agents, coordination } = assignment;
    const startTime = Date.now();
    
    console.log(`🚀 Executing collaborative task: ${task.title}`);
    console.log(`👥 Agents involved: ${agents.map(a => a.name).join(', ')}`);
    
    try {
      let result;
      
      switch (coordination.type) {
        case 'parallel':
          result = await this.executeParallelWorkflow(assignment);
          break;
        case 'sequential':
          result = await this.executeSequentialWorkflow(assignment);
          break;
        case 'hierarchical':
          result = await this.executeHierarchicalWorkflow(assignment);
          break;
        case 'collaborative':
          result = await this.executeCollaborativeWorkflow(assignment);
          break;
        default:
          result = await this.executeDefaultWorkflow(assignment);
      }
      
      const executionTime = Date.now() - startTime;
      
      // Update agent performance
      agents.forEach(agent => {
        this.updateAgentPerformance(agent, true, executionTime);
        agent.status = 'active';
        agent.currentTask = undefined;
        const currentLoad = this.agentLoadBalancer.get(agent.id) || 1;
        this.agentLoadBalancer.set(agent.id, Math.max(0, currentLoad - 1));
      });
      
      this.emit('taskCompleted', agents, task, result);
      
      console.log(`✅ Collaborative task completed in ${executionTime}ms`);
      return result;
      
    } catch (error) {
      // Handle failure
      agents.forEach(agent => {
        this.updateAgentPerformance(agent, false, Date.now() - startTime);
        agent.status = 'active';
        agent.currentTask = undefined;
        const currentLoad = this.agentLoadBalancer.get(agent.id) || 1;
        this.agentLoadBalancer.set(agent.id, Math.max(0, currentLoad - 1));
      });
      
      this.emit('taskFailed', agents, task, error);
      throw error;
    }
  }

  /**
   * Assign a single task to a specific agent
   */
  public async assignTask(agentId: string, task: BMADTask): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      console.error(`❌ Agent not found: ${agentId}`);
      return false;
    }
    
    if (agent.status === 'busy') {
      console.warn(`⚠️ Agent ${agent.name} is currently busy`);
      return false;
    }
    
    agent.status = 'busy';
    agent.currentTask = task;
    
    console.log(`📋 Task assigned to ${agent.name}: ${task.title}`);
    return true;
  }

  /**
   * Get all agents
   */
  public getAllAgents(): BMADAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get agent status overview
   */
  public getAgentStatus(): { [agentId: string]: any } {
    const status: { [agentId: string]: any } = {};
    
    this.agents.forEach((agent, id) => {
      status[id] = {
        name: agent.name,
        role: agent.role,
        status: agent.status,
        currentTask: agent.currentTask?.title,
        performance: agent.performance,
        load: this.agentLoadBalancer.get(id) || 0
      };
    });
    
    return status;
  }

  /**
   * Get agent summary statistics
   */
  public getAgentSummary(): any {
    const agents = Array.from(this.agents.values());
    
    return {
      total: agents.length,
      active: agents.filter(a => a.status === 'active').length,
      busy: agents.filter(a => a.status === 'busy').length,
      idle: agents.filter(a => a.status === 'idle').length,
      offline: agents.filter(a => a.status === 'offline').length,
      averageQuality: this.calculateAverageQuality(),
      averageSuccessRate: this.calculateAverageSuccessRate(),
      totalTasksCompleted: this.calculateTotalTasksCompleted()
    };
  }

  // Private workflow execution methods
  private async executeParallelWorkflow(assignment: AgentAssignment): Promise<any> {
    const { task, agents } = assignment;
    
    // Execute all agents in parallel
    const promises = agents.map(async (agent, index) => {
      const agentTask = this.createAgentSpecificTask(task, agent, index);
      return this.executeAgentTask(agent, agentTask);
    });
    
    const results = await Promise.all(promises);
    
    return {
      strategy: 'parallel',
      results,
      artifacts: this.combineArtifacts(results),
      summary: this.createCollaborativeSummary(results, agents)
    };
  }

  private async executeSequentialWorkflow(assignment: AgentAssignment): Promise<any> {
    const { task, agents, coordination } = assignment;
    const results: any[] = [];
    let currentContext = task;
    
    // Execute agents sequentially
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      const step = coordination.workflow[i];
      
      const agentTask = this.createAgentSpecificTask(currentContext, agent, i);
      const result = await this.executeAgentTask(agent, agentTask);
      
      results.push(result);
      currentContext = this.updateContextWithResult(currentContext, result);
    }
    
    return {
      strategy: 'sequential',
      results,
      artifacts: this.combineArtifacts(results),
      summary: this.createCollaborativeSummary(results, agents)
    };
  }

  private async executeHierarchicalWorkflow(assignment: AgentAssignment): Promise<any> {
    const { task, agents, coordination } = assignment;
    const leader = agents.find(a => a.id === coordination.leader);
    const subordinates = agents.filter(a => a.id !== coordination.leader);
    
    // Leader coordinates the work
    const leaderPlan = await this.executeAgentTask(leader!, {
      ...task,
      description: `${task.description}\n\nCoordinate the following agents: ${subordinates.map(a => a.name).join(', ')}`
    });
    
    // Subordinates execute based on leader's plan
    const subordinateResults = await Promise.all(
      subordinates.map((agent, index) => {
        const delegatedTask = this.createDelegatedTask(task, agent, leaderPlan, index);
        return this.executeAgentTask(agent, delegatedTask);
      })
    );
    
    return {
      strategy: 'hierarchical',
      leaderPlan,
      subordinateResults,
      artifacts: this.combineArtifacts([leaderPlan, ...subordinateResults]),
      summary: this.createHierarchicalSummary(leaderPlan, subordinateResults, agents)
    };
  }

  private async executeCollaborativeWorkflow(assignment: AgentAssignment): Promise<any> {
    const { task, agents } = assignment;
    
    // Phase 1: Individual analysis
    const analyses = await Promise.all(
      agents.map(agent => this.executeAgentTask(agent, {
        ...task,
        description: `${task.description}\n\nProvide your expert analysis from a ${agent.role} perspective.`
      }))
    );
    
    // Phase 2: Collaborative synthesis
    const synthesis = await this.synthesizeCollaborativeResults(analyses, agents, task);
    
    return {
      strategy: 'collaborative',
      analyses,
      synthesis,
      artifacts: this.combineArtifacts([...analyses, synthesis]),
      summary: this.createCollaborativeSummary([...analyses, synthesis], agents)
    };
  }

  private async executeDefaultWorkflow(assignment: AgentAssignment): Promise<any> {
    return this.executeParallelWorkflow(assignment);
  }

  // Helper methods
  private selectBestAgentForRole(role: BMADAgentRole): BMADAgent | undefined {
    const candidates = Array.from(this.agents.values())
      .filter(agent => agent.role === role && agent.status !== 'offline');
    
    if (candidates.length === 0) {
      return undefined;
    }
    
    // Select based on performance and current load
    return candidates.sort((a, b) => {
      const scoreA = a.performance.qualityScore - ((this.agentLoadBalancer.get(a.id) || 0) * 10);
      const scoreB = b.performance.qualityScore - ((this.agentLoadBalancer.get(b.id) || 0) * 10);
      return scoreB - scoreA;
    })[0];
  }

  private determineCoordinationStrategy(task: BMADTask, agents: BMADAgent[]): CoordinationStrategy {
    if (agents.length === 1) {
      return {
        type: 'sequential',
        workflow: [{
          agent: agents[0].id,
          action: 'execute',
          dependencies: [],
          timeout: this.config.taskTimeout * 60 * 1000
        }]
      };
    }
    
    // Determine strategy based on task type and agents
    if (task.type === 'requirements-analysis' || task.type === 'architecture-design') {
      return {
        type: 'collaborative',
        workflow: agents.map(agent => ({
          agent: agent.id,
          action: 'analyze',
          dependencies: [],
          timeout: this.config.taskTimeout * 60 * 1000
        }))
      };
    }
    
    if (task.effort.complexity === 'complex') {
      // Use hierarchical for complex tasks
      const leader = agents.find(a => ['architect', 'scrum-master'].includes(a.role));
      return {
        type: 'hierarchical',
        leader: leader?.id,
        workflow: agents.map(agent => ({
          agent: agent.id,
          action: agent.id === leader?.id ? 'coordinate' : 'execute',
          dependencies: agent.id === leader?.id ? [] : [leader?.id || ''],
          timeout: this.config.taskTimeout * 60 * 1000
        }))
      };
    }
    
    // Default to parallel execution
    return {
      type: 'parallel',
      workflow: agents.map(agent => ({
        agent: agent.id,
        action: 'execute',
        dependencies: [],
        timeout: this.config.taskTimeout * 60 * 1000
      }))
    };
  }

  private async executeAgentTask(agent: BMADAgent, task: any): Promise<any> {
    console.log(`🎯 ${agent.name} executing task: ${task.title}`);
    
    // Simulate agent execution with role-specific behavior
    const executionTime = Math.random() * 5000 + 1000; // 1-6 seconds
    await new Promise(resolve => setTimeout(resolve, executionTime));
    
    // Generate role-specific result
    const result = this.generateAgentResult(agent, task);
    
    console.log(`✅ ${agent.name} completed task`);
    return result;
  }

  private generateAgentResult(agent: BMADAgent, task: any): any {
    const baseResult = {
      agentId: agent.id,
      agentName: agent.name,
      agentRole: agent.role,
      taskId: task.id,
      executionTime: Date.now(),
      success: Math.random() > 0.1, // 90% success rate
    };

    // Role-specific results
    switch (agent.role) {
      case 'analyst':
        return {
          ...baseResult,
          requirements: [
            'User authentication requirement',
            'Data validation requirement',
            'Performance requirement (<2s response time)'
          ],
          stakeholders: ['End users', 'System administrators', 'Business owners'],
          businessValue: 'High - critical for user engagement'
        };
        
      case 'product-manager':
        return {
          ...baseResult,
          productRequirements: 'Comprehensive PRD generated',
          prioritization: 'Features prioritized by business value',
          roadmap: 'Development roadmap created',
          marketAnalysis: 'Competitive analysis completed'
        };
        
      case 'architect':
        return {
          ...baseResult,
          architectureSpec: 'System architecture designed',
          technologyStack: 'Tech stack recommendations provided',
          scalabilityPlan: 'Scalability considerations documented',
          integrationPoints: 'API and integration points defined'
        };
        
      case 'scrum-master':
        return {
          ...baseResult,
          storyFiles: 'Detailed user stories created with full context',
          acceptanceCriteria: 'Clear acceptance criteria defined',
          taskBreakdown: 'Tasks broken down for development team',
          sprintPlan: 'Sprint planning recommendations'
        };
        
      default:
        return {
          ...baseResult,
          output: `${agent.role} analysis completed`,
          recommendations: ['Follow best practices', 'Consider performance implications'],
          artifacts: ['Analysis document', 'Recommendations report']
        };
    }
  }

  private createAgentSpecificTask(task: any, agent: BMADAgent, index: number): any {
    return {
      ...task,
      agentFocus: agent.role,
      agentCapabilities: agent.capabilities,
      agentIndex: index
    };
  }

  private createDelegatedTask(task: any, agent: BMADAgent, leaderPlan: any, index: number): any {
    return {
      ...task,
      delegation: leaderPlan.delegationPlan?.[index] || `Execute ${agent.role} responsibilities`,
      leaderGuidance: leaderPlan.guidance || 'Follow architectural guidelines'
    };
  }

  private updateContextWithResult(context: any, result: any): any {
    return {
      ...context,
      previousResults: [...(context.previousResults || []), result]
    };
  }

  private async synthesizeCollaborativeResults(analyses: any[], agents: BMADAgent[], task: any): Promise<any> {
    // Combine all agent analyses into a coherent synthesis
    return {
      synthesisType: 'collaborative',
      agentCount: agents.length,
      combinedInsights: 'All agent perspectives integrated',
      consensusPoints: this.findConsensusPoints(analyses),
      conflictResolutions: this.resolveConflicts(analyses),
      finalRecommendation: 'Synthesized recommendation based on all expert input'
    };
  }

  private combineArtifacts(results: any[]): any[] {
    return results.flatMap(result => result.artifacts || []);
  }

  private createCollaborativeSummary(results: any[], agents: BMADAgent[]): string {
    return `Collaborative effort by ${agents.map(a => a.name).join(', ')} produced ${results.length} integrated results`;
  }

  private createHierarchicalSummary(leaderResult: any, subordinateResults: any[], agents: BMADAgent[]): string {
    const leader = agents[0]; // Simplified
    return `${leader.name} coordinated ${subordinateResults.length} team members to achieve comprehensive results`;
  }

  private findConsensusPoints(analyses: any[]): string[] {
    // Simplified consensus finding
    return ['Performance is critical', 'Security must be prioritized', 'User experience is key'];
  }

  private resolveConflicts(analyses: any[]): any[] {
    // Simplified conflict resolution
    return [{
      conflict: 'Technology choice disagreement',
      resolution: 'Selected based on team expertise and scalability requirements'
    }];
  }

  private updateAgentPerformance(agent: BMADAgent, success: boolean, executionTime: number): void {
    const history = this.performanceHistory.get(agent.id) || [];
    history.push(success ? 1 : 0);
    
    if (history.length > 100) {
      history.shift();
    }
    
    this.performanceHistory.set(agent.id, history);
    
    // Update agent performance metrics
    agent.performance.tasksCompleted++;
    agent.performance.averageTime = (agent.performance.averageTime + executionTime) / 2;
    agent.performance.successRate = (history.reduce((sum, s) => sum + s, 0) / history.length) * 100;
    
    // Update quality score based on recent performance
    if (success) {
      agent.performance.qualityScore = Math.min(100, agent.performance.qualityScore + 0.5);
    } else {
      agent.performance.qualityScore = Math.max(0, agent.performance.qualityScore - 2);
    }
  }

  private calculateAverageQuality(): number {
    const agents = Array.from(this.agents.values());
    if (agents.length === 0) return 0;
    
    const totalQuality = agents.reduce((sum, agent) => sum + agent.performance.qualityScore, 0);
    return Math.round((totalQuality / agents.length) * 100) / 100;
  }

  private calculateAverageSuccessRate(): number {
    const agents = Array.from(this.agents.values());
    if (agents.length === 0) return 0;
    
    const totalSuccessRate = agents.reduce((sum, agent) => sum + agent.performance.successRate, 0);
    return Math.round((totalSuccessRate / agents.length) * 100) / 100;
  }

  private calculateTotalTasksCompleted(): number {
    return Array.from(this.agents.values())
      .reduce((sum, agent) => sum + agent.performance.tasksCompleted, 0);
  }

  /**
   * Shutdown agent manager
   */
  public async shutdown(): Promise<void> {
    // Set all agents to offline
    this.agents.forEach(agent => {
      agent.status = 'offline';
      agent.currentTask = undefined;
    });
    
    this.assignments.clear();
    this.removeAllListeners();
    
    console.log('🔄 Agent Manager shutdown complete');
  }
}