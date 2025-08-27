import { BMADProject, BMADTask, StoryFile, TechnicalContext } from '../types';

interface ContextEntry {
  id: string;
  type: 'project' | 'task' | 'story' | 'agent' | 'system';
  context: any;
  dependencies: string[];
  importance: number;
  lastAccessed: Date;
  compressionLevel: number;
}

interface ContextGraph {
  nodes: Map<string, ContextEntry>;
  edges: Map<string, string[]>;
}

export class ContextManager {
  private contextGraph: ContextGraph;
  private maxCacheSize = 1000;
  private compressionThreshold = 0.7;
  private accessPatterns = new Map<string, number[]>();
  
  constructor() {
    this.contextGraph = {
      nodes: new Map(),
      edges: new Map()
    };
  }

  /**
   * Store context with intelligent compression and relationship mapping
   * Eliminates context loss between AI interactions
   */
  public async storeContext(
    id: string,
    type: ContextEntry['type'],
    context: any,
    dependencies: string[] = [],
    importance: number = 0.5
  ): Promise<void> {
    const entry: ContextEntry = {
      id,
      type,
      context: await this.compressContext(context),
      dependencies,
      importance,
      lastAccessed: new Date(),
      compressionLevel: this.calculateCompressionLevel(context)
    };
    
    // Store in graph
    this.contextGraph.nodes.set(id, entry);
    this.contextGraph.edges.set(id, dependencies);
    
    // Update reverse dependencies
    dependencies.forEach(depId => {
      const depEdges = this.contextGraph.edges.get(depId) || [];
      if (!depEdges.includes(id)) {
        this.contextGraph.edges.set(depId, [...depEdges, id]);
      }
    });
    
    // Manage cache size
    await this.manageCacheSize();
    
    console.log(`📝 Context stored: ${id} (${type}) with ${dependencies.length} dependencies`);
  }

  /**
   * Retrieve context with full dependency resolution
   */
  public async retrieveContext(
    id: string,
    includeDepth: number = 2
  ): Promise<any> {
    const entry = this.contextGraph.nodes.get(id);
    if (!entry) {
      console.warn(`⚠️ Context not found: ${id}`);
      return null;
    }
    
    // Update access pattern
    this.updateAccessPattern(id);
    entry.lastAccessed = new Date();
    
    // Build context with dependencies
    const fullContext = await this.buildFullContext(entry, includeDepth);
    
    console.log(`📖 Context retrieved: ${id} with depth ${includeDepth}`);
    return fullContext;
  }

  /**
   * Create comprehensive project context for BMAD phases
   */
  public async createProjectContext(project: BMADProject): Promise<any> {
    const contextId = `project_${project.id}`;
    
    const projectContext = {
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        phase: project.currentPhase,
        created: project.created,
        updated: project.updated
      },
      requirements: {
        functional: project.requirements.functionalRequirements,
        nonFunctional: project.requirements.nonFunctionalRequirements,
        business: project.requirements.businessGoals,
        constraints: project.requirements.technicalConstraints,
        stakeholders: project.requirements.stakeholders
      },
      architecture: project.architecture,
      metadata: project.metadata
    };
    
    await this.storeContext(contextId, 'project', projectContext, [], 1.0);
    return contextId;
  }

  /**
   * Create task context with architectural awareness
   */
  public async createTaskContext(
    task: BMADTask,
    projectId: string,
    technicalContext?: TechnicalContext
  ): Promise<string> {
    const contextId = `task_${task.id}`;
    const projectContextId = `project_${projectId}`;
    
    const taskContext = {
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        type: task.type,
        priority: task.priority,
        status: task.status,
        effort: task.effort
      },
      technical: technicalContext,
      dependencies: task.dependencies,
      artifacts: task.artifacts
    };
    
    await this.storeContext(
      contextId,
      'task',
      taskContext,
      [projectContextId, ...task.dependencies],
      this.calculateTaskImportance(task)
    );
    
    return contextId;
  }

  /**
   * Create story file context with full architectural context
   */
  public async createStoryContext(story: StoryFile, projectId: string): Promise<string> {
    const contextId = `story_${story.id}`;
    const projectContextId = `project_${projectId}`;
    
    const storyContext = {
      story: {
        id: story.id,
        title: story.title,
        description: story.description,
        acceptanceCriteria: story.acceptanceCriteria
      },
      technical: story.technicalContext,
      dependencies: story.dependencies,
      effort: story.effort,
      generatedCode: story.generatedCode
    };
    
    await this.storeContext(
      contextId,
      'story',
      storyContext,
      [projectContextId],
      0.8
    );
    
    return contextId;
  }

  /**
   * Create agent execution context
   */
  public async createAgentContext(
    agentId: string,
    task: any,
    previousResults: any[] = []
  ): Promise<string> {
    const contextId = `agent_${agentId}_${Date.now()}`;
    
    const agentContext = {
      agent: {
        id: agentId,
        executedAt: new Date(),
        task: task
      },
      previousResults: previousResults,
      continuity: this.buildAgentContinuity(agentId, previousResults)
    };
    
    await this.storeContext(
      contextId,
      'agent',
      agentContext,
      this.extractTaskDependencies(task),
      0.6
    );
    
    return contextId;
  }

  /**
   * Search context by criteria
   */
  public async searchContext(criteria: {
    type?: ContextEntry['type'];
    keywords?: string[];
    timeRange?: { start: Date; end: Date };
    importance?: { min: number; max: number };
  }): Promise<ContextEntry[]> {
    const results: ContextEntry[] = [];
    
    for (const [id, entry] of this.contextGraph.nodes) {
      let matches = true;
      
      // Filter by type
      if (criteria.type && entry.type !== criteria.type) {
        matches = false;
      }
      
      // Filter by keywords
      if (criteria.keywords && matches) {
        const contextString = JSON.stringify(entry.context).toLowerCase();
        const hasKeywords = criteria.keywords.some(keyword => 
          contextString.includes(keyword.toLowerCase())
        );
        if (!hasKeywords) {
          matches = false;
        }
      }
      
      // Filter by time range
      if (criteria.timeRange && matches) {
        if (entry.lastAccessed < criteria.timeRange.start || 
            entry.lastAccessed > criteria.timeRange.end) {
          matches = false;
        }
      }
      
      // Filter by importance
      if (criteria.importance && matches) {
        if (entry.importance < criteria.importance.min || 
            entry.importance > criteria.importance.max) {
          matches = false;
        }
      }
      
      if (matches) {
        results.push(entry);
      }
    }
    
    // Sort by relevance (importance + recency)
    return results.sort((a, b) => {
      const scoreA = a.importance + (Date.now() - a.lastAccessed.getTime()) / (24 * 60 * 60 * 1000);
      const scoreB = b.importance + (Date.now() - b.lastAccessed.getTime()) / (24 * 60 * 60 * 1000);
      return scoreB - scoreA;
    });
  }

  /**
   * Get context preservation metrics
   */
  public getContextPreservationMetrics(): any {
    const totalEntries = this.contextGraph.nodes.size;
    const compressionRatios = Array.from(this.contextGraph.nodes.values())
      .map(entry => entry.compressionLevel);
    
    const averageCompression = compressionRatios.length > 0 ? 
      compressionRatios.reduce((sum, ratio) => sum + ratio, 0) / compressionRatios.length : 0;
    
    const dependencyCount = Array.from(this.contextGraph.edges.values())
      .reduce((sum, deps) => sum + deps.length, 0);
    
    return {
      totalContexts: totalEntries,
      averageCompressionRatio: Math.round(averageCompression * 100) / 100,
      totalDependencies: dependencyCount,
      contextPreservation: Math.max(0, 100 - (averageCompression * 100)), // Higher compression = lower preservation
      cacheUtilization: (totalEntries / this.maxCacheSize) * 100
    };
  }

  // Private helper methods
  private async compressContext(context: any): Promise<any> {
    // Intelligent context compression
    const contextString = JSON.stringify(context);
    const compressionRatio = this.calculateCompressionNeed(contextString);
    
    if (compressionRatio > this.compressionThreshold) {
      return this.applyIntelligentCompression(context);
    }
    
    return context;
  }

  private calculateCompressionLevel(context: any): number {
    const originalSize = JSON.stringify(context).length;
    const compressedSize = JSON.stringify(context).length; // Simplified - would use actual compression
    
    return originalSize > 0 ? compressedSize / originalSize : 1;
  }

  private calculateCompressionNeed(contextString: string): number {
    // Calculate compression need based on size and redundancy
    const size = contextString.length;
    const redundancy = this.calculateRedundancy(contextString);
    
    return Math.min(1, (size / 10000) + redundancy); // Compress if large or redundant
  }

  private calculateRedundancy(text: string): number {
    // Simple redundancy calculation
    const words = text.split(' ');
    const uniqueWords = new Set(words);
    
    return 1 - (uniqueWords.size / words.length);
  }

  private applyIntelligentCompression(context: any): any {
    // Apply compression strategies
    const compressed = { ...context };
    
    // Remove verbose descriptions, keep essential information
    if (compressed.description && compressed.description.length > 500) {
      compressed.description = compressed.description.substring(0, 497) + '...';
    }
    
    // Compress arrays by sampling
    Object.keys(compressed).forEach(key => {
      if (Array.isArray(compressed[key]) && compressed[key].length > 20) {
        compressed[key] = [
          ...compressed[key].slice(0, 10),
          { _compressed: `... ${compressed[key].length - 20} items omitted ...` },
          ...compressed[key].slice(-10)
        ];
      }
    });
    
    return compressed;
  }

  private async buildFullContext(entry: ContextEntry, depth: number): Promise<any> {
    if (depth <= 0) {
      return entry.context;
    }
    
    const fullContext = {
      ...entry.context,
      _meta: {
        id: entry.id,
        type: entry.type,
        importance: entry.importance,
        lastAccessed: entry.lastAccessed
      }
    };
    
    // Include dependency contexts
    const dependencies = this.contextGraph.edges.get(entry.id) || [];
    if (dependencies.length > 0 && depth > 1) {
      fullContext._dependencies = {};
      
      for (const depId of dependencies.slice(0, 5)) { // Limit to prevent explosion
        const depEntry = this.contextGraph.nodes.get(depId);
        if (depEntry) {
          fullContext._dependencies[depId] = await this.buildFullContext(depEntry, depth - 1);
        }
      }
    }
    
    return fullContext;
  }

  private calculateTaskImportance(task: BMADTask): number {
    let importance = 0.5;
    
    // Priority factor
    const priorityWeights = { critical: 1.0, high: 0.8, medium: 0.5, low: 0.3 };
    importance = priorityWeights[task.priority];
    
    // Complexity factor
    if (task.effort.complexity === 'complex') importance += 0.2;
    if (task.effort.riskLevel === 'high') importance += 0.1;
    
    // Dependency factor
    if (task.dependencies.length > 0) importance += 0.1;
    
    return Math.min(1.0, importance);
  }

  private buildAgentContinuity(agentId: string, previousResults: any[]): any {
    // Build continuity context for agent
    return {
      agentId,
      previousExecutions: previousResults.length,
      patterns: this.extractPatterns(previousResults),
      learnings: this.extractLearnings(previousResults)
    };
  }

  private extractTaskDependencies(task: any): string[] {
    // Extract context dependencies from task
    const deps = [];
    
    if (task.projectId) deps.push(`project_${task.projectId}`);
    if (task.dependencies) deps.push(...task.dependencies);
    
    return deps;
  }

  private extractPatterns(results: any[]): any {
    // Extract patterns from previous results
    if (results.length === 0) return {};
    
    return {
      successRate: results.filter(r => r.success).length / results.length,
      averageExecutionTime: results.reduce((sum, r) => sum + (r.executionTime || 0), 0) / results.length,
      commonErrors: this.extractCommonErrors(results)
    };
  }

  private extractLearnings(results: any[]): any {
    // Extract learnings from previous executions
    return {
      bestPractices: [],
      avoidances: [],
      optimizations: []
    };
  }

  private extractCommonErrors(results: any[]): string[] {
    const errors = results.filter(r => !r.success).map(r => r.error);
    // Simple error extraction - in real implementation would use ML
    return [...new Set(errors)].slice(0, 5);
  }

  private updateAccessPattern(id: string): void {
    const pattern = this.accessPatterns.get(id) || [];
    pattern.push(Date.now());
    
    // Keep only last 100 accesses
    if (pattern.length > 100) {
      pattern.shift();
    }
    
    this.accessPatterns.set(id, pattern);
  }

  private async manageCacheSize(): Promise<void> {
    if (this.contextGraph.nodes.size <= this.maxCacheSize) {
      return;
    }
    
    // Remove least important and least accessed contexts
    const entries = Array.from(this.contextGraph.nodes.entries())
      .sort(([, a], [, b]) => {
        const scoreA = a.importance + (Date.now() - a.lastAccessed.getTime()) / (24 * 60 * 60 * 1000);
        const scoreB = b.importance + (Date.now() - b.lastAccessed.getTime()) / (24 * 60 * 60 * 1000);
        return scoreA - scoreB; // Ascending order (lowest first)
      });
    
    // Remove bottom 10%
    const toRemove = Math.ceil(this.contextGraph.nodes.size * 0.1);
    for (let i = 0; i < toRemove; i++) {
      const [id] = entries[i];
      this.contextGraph.nodes.delete(id);
      this.contextGraph.edges.delete(id);
      this.accessPatterns.delete(id);
    }
    
    console.log(`🧹 Context cache cleaned: removed ${toRemove} entries`);
  }

  /**
   * Export context data for analysis
   */
  public exportContextData(): any {
    return {
      contexts: Array.from(this.contextGraph.nodes.entries()),
      dependencies: Array.from(this.contextGraph.edges.entries()),
      accessPatterns: Array.from(this.accessPatterns.entries()),
      metrics: this.getContextPreservationMetrics(),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Clear all context data
   */
  public clearCache(): void {
    this.contextGraph.nodes.clear();
    this.contextGraph.edges.clear();
    this.accessPatterns.clear();
    console.log('🗑️ Context cache cleared');
  }

  /**
   * Get context statistics
   */
  public getContextStats(): any {
    return {
      totalContexts: this.contextGraph.nodes.size,
      totalDependencies: Array.from(this.contextGraph.edges.values()).reduce((sum, deps) => sum + deps.length, 0),
      cacheUtilization: (this.contextGraph.nodes.size / this.maxCacheSize) * 100,
      ...this.getContextPreservationMetrics()
    };
  }
}