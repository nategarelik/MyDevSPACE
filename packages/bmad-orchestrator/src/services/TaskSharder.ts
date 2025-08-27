import { BMADTask } from '../types';

interface ShardingStrategy {
  name: string;
  apply: (task: BMADTask) => Promise<BMADTask[]>;
}

export class TaskSharder {
  private strategies = new Map<string, ShardingStrategy>();
  private shardingHistory = new Map<string, BMADTask[]>();

  constructor() {
    this.initializeStrategies();
  }

  /**
   * Break down complex requirements into smaller, manageable tasks
   * that AI can handle more effectively
   */
  public async shardTask(task: BMADTask): Promise<BMADTask[]> {
    console.log(`🔀 Starting task sharding for: ${task.title}`);
    
    // Determine sharding strategy based on task characteristics
    const strategy = this.selectShardingStrategy(task);
    
    try {
      // Apply the selected strategy
      const shards = await strategy.apply(task);
      
      // Store sharding history for reference
      this.shardingHistory.set(task.id, shards);
      
      console.log(`✅ Task sharded into ${shards.length} manageable pieces using ${strategy.name}`);
      return shards;
      
    } catch (error) {
      console.error(`❌ Task sharding failed: ${error}`);
      throw new Error(`Failed to shard task '${task.title}': ${error}`);
    }
  }

  /**
   * Get the sharding history for a task
   */
  public getShardingHistory(taskId: string): BMADTask[] | undefined {
    return this.shardingHistory.get(taskId);
  }

  /**
   * Check if a task should be sharded based on complexity metrics
   */
  public shouldShardTask(task: BMADTask): boolean {
    const complexity = this.calculateTaskComplexity(task);
    const effort = task.effort.estimated;
    const riskLevel = task.effort.riskLevel;
    
    // Shard if task is complex, high effort, or high risk
    return complexity > 7 || effort > 8 || riskLevel === 'high';
  }

  /**
   * Calculate task complexity based on multiple factors
   */
  private calculateTaskComplexity(task: BMADTask): number {
    let complexity = 5; // Base complexity
    
    // Factor 1: Description length and detail
    const descriptionWords = task.description.split(' ').length;
    if (descriptionWords > 100) complexity += 2;
    if (descriptionWords > 200) complexity += 2;
    
    // Factor 2: Number of dependencies
    complexity += Math.min(task.dependencies.length * 0.5, 3);
    
    // Factor 3: Task type complexity
    const typeComplexity = {
      'requirements-analysis': 6,
      'architecture-design': 8,
      'story-creation': 4,
      'development': 7,
      'testing': 5,
      'deployment': 6,
      'documentation': 3,
      'review': 4
    };
    
    complexity = Math.max(complexity, typeComplexity[task.type] || 5);
    
    // Factor 4: Priority impact
    const priorityMultiplier = {
      'critical': 1.3,
      'high': 1.1,
      'medium': 1.0,
      'low': 0.9
    };
    
    complexity *= priorityMultiplier[task.priority];
    
    return Math.round(complexity);
  }

  /**
   * Select the most appropriate sharding strategy
   */
  private selectShardingStrategy(task: BMADTask): ShardingStrategy {
    const complexity = this.calculateTaskComplexity(task);
    const taskType = task.type;
    
    // Choose strategy based on task characteristics
    if (taskType === 'architecture-design' && complexity > 8) {
      return this.strategies.get('layered-architecture')!;
    }
    
    if (taskType === 'development' && task.effort.estimated > 10) {
      return this.strategies.get('feature-decomposition')!;
    }
    
    if (taskType === 'requirements-analysis') {
      return this.strategies.get('user-story-breakdown')!;
    }
    
    if (complexity > 7) {
      return this.strategies.get('complexity-based')!;
    }
    
    return this.strategies.get('default')!;
  }

  /**
   * Initialize all sharding strategies
   */
  private initializeStrategies(): void {
    // Default sharding strategy
    this.strategies.set('default', {
      name: 'Default Sharding',
      apply: async (task: BMADTask) => {
        return this.createTimeBoxedShards(task, 4); // 4-hour chunks
      }
    });

    // Complexity-based sharding
    this.strategies.set('complexity-based', {
      name: 'Complexity-Based Sharding',
      apply: async (task: BMADTask) => {
        return this.createComplexityBasedShards(task);
      }
    });

    // Feature decomposition for development tasks
    this.strategies.set('feature-decomposition', {
      name: 'Feature Decomposition',
      apply: async (task: BMADTask) => {
        return this.createFeatureBasedShards(task);
      }
    });

    // User story breakdown for requirements
    this.strategies.set('user-story-breakdown', {
      name: 'User Story Breakdown',
      apply: async (task: BMADTask) => {
        return this.createUserStoryShards(task);
      }
    });

    // Layered architecture sharding
    this.strategies.set('layered-architecture', {
      name: 'Layered Architecture Sharding',
      apply: async (task: BMADTask) => {
        return this.createArchitectureLayerShards(task);
      }
    });
  }

  /**
   * Create time-boxed task shards
   */
  private async createTimeBoxedShards(task: BMADTask, maxHours: number): Promise<BMADTask[]> {
    const totalEffort = task.effort.estimated;
    const shardCount = Math.ceil(totalEffort / maxHours);
    const shards: BMADTask[] = [];
    
    for (let i = 0; i < shardCount; i++) {
      const remainingEffort = totalEffort - (i * maxHours);
      const shardEffort = Math.min(maxHours, remainingEffort);
      
      const shard: BMADTask = {
        ...task,
        id: this.generateShardId(task.id, i),
        title: `${task.title} - Part ${i + 1}/${shardCount}`,
        description: `${task.description}\n\n**Shard ${i + 1}**: Focus on ${this.getShardFocus(i, shardCount)}`,
        effort: {
          ...task.effort,
          estimated: shardEffort
        },
        dependencies: i === 0 ? task.dependencies : [this.generateShardId(task.id, i - 1)],
        status: 'backlog'
      };
      
      shards.push(shard);
    }
    
    return shards;
  }

  /**
   * Create complexity-based shards
   */
  private async createComplexityBasedShards(task: BMADTask): Promise<BMADTask[]> {
    const complexityAreas = this.identifyComplexityAreas(task);
    const shards: BMADTask[] = [];
    
    complexityAreas.forEach((area, index) => {
      const shard: BMADTask = {
        ...task,
        id: this.generateShardId(task.id, index),
        title: `${task.title} - ${area.name}`,
        description: `${area.description}\n\nComplexity Level: ${area.complexity}`,
        effort: {
          ...task.effort,
          estimated: area.estimatedHours,
          complexity: area.complexity === 'high' ? 'complex' : 
                     area.complexity === 'medium' ? 'medium' : 'simple'
        },
        dependencies: area.dependencies,
        status: 'backlog'
      };
      
      shards.push(shard);
    });
    
    return shards;
  }

  /**
   * Create feature-based shards for development tasks
   */
  private async createFeatureBasedShards(task: BMADTask): Promise<BMADTask[]> {
    const features = this.extractFeatures(task);
    const shards: BMADTask[] = [];
    
    features.forEach((feature, index) => {
      const shard: BMADTask = {
        ...task,
        id: this.generateShardId(task.id, index),
        title: `Implement ${feature.name}`,
        description: `${feature.description}\n\n**Acceptance Criteria:**\n${feature.acceptanceCriteria.join('\n')}`,
        effort: {
          ...task.effort,
          estimated: feature.estimatedHours
        },
        dependencies: feature.dependencies,
        status: 'backlog'
      };
      
      shards.push(shard);
    });
    
    return shards;
  }

  /**
   * Create user story-based shards
   */
  private async createUserStoryShards(task: BMADTask): Promise<BMADTask[]> {
    const userStories = this.extractUserStories(task);
    const shards: BMADTask[] = [];
    
    userStories.forEach((story, index) => {
      const shard: BMADTask = {
        ...task,
        id: this.generateShardId(task.id, index),
        title: `User Story: ${story.title}`,
        description: `**As a** ${story.persona}\n**I want** ${story.want}\n**So that** ${story.benefit}\n\n${story.details}`,
        effort: {
          ...task.effort,
          estimated: story.estimatedHours
        },
        dependencies: story.dependencies,
        status: 'backlog'
      };
      
      shards.push(shard);
    });
    
    return shards;
  }

  /**
   * Create architecture layer-based shards
   */
  private async createArchitectureLayerShards(task: BMADTask): Promise<BMADTask[]> {
    const layers = [
      { name: 'Presentation Layer', focus: 'UI/UX design and user interfaces' },
      { name: 'Business Logic Layer', focus: 'Core business rules and workflows' },
      { name: 'Data Access Layer', focus: 'Database design and data management' },
      { name: 'Integration Layer', focus: 'External APIs and service integrations' }
    ];
    
    const shards: BMADTask[] = [];
    const effortPerLayer = Math.ceil(task.effort.estimated / layers.length);
    
    layers.forEach((layer, index) => {
      const shard: BMADTask = {
        ...task,
        id: this.generateShardId(task.id, index),
        title: `${task.title} - ${layer.name}`,
        description: `${task.description}\n\n**Layer Focus:** ${layer.focus}`,
        effort: {
          ...task.effort,
          estimated: effortPerLayer
        },
        dependencies: index === 0 ? task.dependencies : [this.generateShardId(task.id, index - 1)],
        status: 'backlog'
      };
      
      shards.push(shard);
    });
    
    return shards;
  }

  // Helper methods for extracting information from tasks
  private getShardFocus(index: number, total: number): string {
    const focuses = [
      'initial setup and foundation',
      'core implementation',
      'advanced features',
      'testing and refinement',
      'optimization and cleanup'
    ];
    
    return focuses[Math.min(index, focuses.length - 1)];
  }

  private identifyComplexityAreas(task: BMADTask): any[] {
    // Simplified complexity area identification
    return [
      { 
        name: 'Core Logic', 
        description: 'Main functionality implementation', 
        complexity: 'high', 
        estimatedHours: 6, 
        dependencies: [] 
      },
      { 
        name: 'Error Handling', 
        description: 'Exception and edge case handling', 
        complexity: 'medium', 
        estimatedHours: 3, 
        dependencies: [this.generateShardId(task.id, 0)] 
      },
      { 
        name: 'Testing', 
        description: 'Unit and integration tests', 
        complexity: 'medium', 
        estimatedHours: 4, 
        dependencies: [this.generateShardId(task.id, 0)] 
      },
      { 
        name: 'Documentation', 
        description: 'Code documentation and README', 
        complexity: 'low', 
        estimatedHours: 2, 
        dependencies: [this.generateShardId(task.id, 0)] 
      }
    ];
  }

  private extractFeatures(task: BMADTask): any[] {
    // Simplified feature extraction
    return [
      { 
        name: 'User Authentication', 
        description: 'Login/logout functionality',
        acceptanceCriteria: ['User can log in', 'User can log out', 'Password validation'],
        estimatedHours: 8,
        dependencies: []
      },
      {
        name: 'Data Persistence',
        description: 'Save and retrieve data',
        acceptanceCriteria: ['Data is saved', 'Data can be retrieved', 'Data validation'],
        estimatedHours: 6,
        dependencies: [this.generateShardId(task.id, 0)]
      }
    ];
  }

  private extractUserStories(task: BMADTask): any[] {
    // Simplified user story extraction
    return [
      {
        title: 'Access System',
        persona: 'registered user',
        want: 'to log into the system',
        benefit: 'I can access my personalized content',
        details: task.description,
        estimatedHours: 4,
        dependencies: []
      },
      {
        title: 'Manage Data',
        persona: 'system user',
        want: 'to create and edit my data',
        benefit: 'I can maintain my information',
        details: task.description,
        estimatedHours: 6,
        dependencies: [this.generateShardId(task.id, 0)]
      }
    ];
  }

  private generateShardId(originalId: string, index: number): string {
    return `${originalId}_shard_${index}`;
  }

  /**
   * Get sharding statistics
   */
  public getShardingStats(): any {
    return {
      totalTasksSharded: this.shardingHistory.size,
      averageShardsPerTask: this.calculateAverageShardsPerTask(),
      strategiesUsed: Array.from(this.strategies.keys())
    };
  }

  private calculateAverageShardsPerTask(): number {
    if (this.shardingHistory.size === 0) return 0;
    
    const totalShards = Array.from(this.shardingHistory.values())
      .reduce((total, shards) => total + shards.length, 0);
    
    return Math.round((totalShards / this.shardingHistory.size) * 100) / 100;
  }
}