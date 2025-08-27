/**
 * Ultimate AI IDE Configuration
 * SuperClaude V4.40.0 + BMAD Method V5.1.3
 */
module.exports = {
  // SuperClaude V4.40.0 Settings
  superclaude: {
    version: 'v4.40.0',
    enabled: true,
    
    // Token Optimization (70% reduction)
    tokenOptimization: {
      enabled: true,
      targetReduction: 70,
      strategy: 'hybrid', // 'context' | 'semantic' | 'intelligent' | 'hybrid'
      cacheSize: 1000
    },
    
    // Commands (21 specialized commands)
    commands: {
      enabled: 'all', // or array of specific commands
      customCommands: [], // user-defined commands
      aliases: {
        'build': 'sc:build',
        'test': 'sc:test',
        'review': 'sc:review'
      }
    },
    
    // AI Agents (14 domain experts)
    agents: {
      'security-engineer': { enabled: true, priority: 'high' },
      'frontend-architect': { enabled: true, priority: 'high' },
      'backend-developer': { enabled: true, priority: 'high' },
      'system-architect': { enabled: true, priority: 'medium' },
      'qa-engineer': { enabled: true, priority: 'medium' },
      'devops-engineer': { enabled: true, priority: 'medium' },
      'database-specialist': { enabled: true, priority: 'medium' },
      'ui-ux-designer': { enabled: true, priority: 'low' },
      'product-manager': { enabled: true, priority: 'low' },
      'data-scientist': { enabled: true, priority: 'low' },
      'performance-engineer': { enabled: true, priority: 'medium' },
      'technical-writer': { enabled: true, priority: 'low' },
      'project-manager': { enabled: true, priority: 'low' },
      'ml-engineer': { enabled: true, priority: 'medium' }
    }
  },
  
  // BMAD Method V5.1.3 Settings
  bmad: {
    version: 'v5.1.3',
    enabled: true,
    
    // Phase Configuration
    phases: {
      planning: {
        enabled: true,
        agents: ['business-analyst', 'product-manager', 'system-architect'],
        timeout: 30000,
        artifactGeneration: true
      },
      development: {
        enabled: true,
        contextPreservationTarget: 90, // >90% context preservation
        storyFileGeneration: true,
        scaffoldingEnabled: true
      }
    },
    
    // Task Sharding
    taskSharding: {
      enabled: true,
      strategy: 'complexity-based', // 'time-boxed' | 'complexity-based' | 'feature-based' | 'auto'
      maxTaskComplexity: 8,
      minTaskSize: 1
    },
    
    // Cost Optimization
    costOptimization: {
      enabled: true,
      trackTokenUsage: true,
      trackTimeEfficiency: true,
      monthlyBudget: 1000 // USD
    }
  },
  
  // Integration Settings
  integration: {
    mode: 'hybrid', // 'superclaude-only' | 'bmad-only' | 'hybrid'
    
    // Hybrid Workflows
    hybridWorkflows: {
      enabled: true,
      fullProjectWorkflow: true,
      smartCodeReview: true,
      intelligentBuild: true
    },
    
    // Cross-system Optimization
    crossSystemOptimization: {
      enabled: true,
      unifiedAnalytics: true,
      sharedContext: true
    },
    
    // Auto-optimization
    autoOptimize: true,
    progressIndicators: true,
    verboseLogging: false
  },
  
  // MCP Servers (6 servers)
  mcpServers: {
    context7: {
      enabled: true,
      url: 'ws://localhost:9001/context7',
      capabilities: ['documentation-analysis', 'context-extraction', 'semantic-search']
    },
    sequential: {
      enabled: true,
      url: 'ws://localhost:9002/sequential',
      capabilities: ['workflow-analysis', 'multi-step-reasoning', 'process-optimization']
    },
    magic: {
      enabled: true,
      url: 'ws://localhost:9003/magic',
      capabilities: ['ui-generation', 'design-systems', 'prototyping']
    },
    playwright: {
      enabled: true,
      url: 'ws://localhost:9004/playwright',
      capabilities: ['automated-testing', 'e2e-generation', 'performance-testing']
    },
    morphllm: {
      enabled: true,
      url: 'ws://localhost:9005/morphllm',
      capabilities: ['code-transformation', 'language-conversion', 'framework-migration']
    },
    serena: {
      enabled: true,
      url: 'ws://localhost:9006/serena',
      capabilities: ['session-management', 'context-persistence', 'state-sync']
    }
  },
  
  // Development Environment
  development: {
    debugMode: false,
    interactiveMode: true,
    progressBars: true,
    colorOutput: true,
    logLevel: 'info' // 'debug' | 'info' | 'warn' | 'error'
  },
  
  // Output Preferences
  output: {
    format: 'enhanced', // 'simple' | 'enhanced' | 'json'
    showStats: true,
    showTokenSavings: true,
    showAgentActivity: true
  }
};