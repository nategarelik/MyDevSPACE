/**
 * GAS (Garelik Agentic System) - Core Configuration
 * Personal AI Operating System for Nathaniel Garelik
 * 
 * This is your AI system's brain - it knows everything about you and manages everything
 */

const GASConfig = {
  // Personal Information
  owner: {
    name: "Nathaniel Garelik",
    preferences: {
      workingHours: "9:00-17:00",
      timezone: "America/New_York",
      programmingLanguages: ["JavaScript", "TypeScript", "Python", "Go"],
      frameworks: ["React", "Next.js", "Node.js", "FastAPI"],
      codeStyle: "modern",
      organizationLevel: "needs-help" // AI should be proactive with organization
    },
    goals: {
      primary: "Build powerful AI-enhanced development workflows",
      secondary: ["Stay organized", "Reduce manual work", "Learn new technologies"],
      currentFocus: "Personal AI system implementation"
    }
  },

  // AI Model Configuration - Multi-model intelligence
  models: {
    // Primary reasoning and analysis
    claude: {
      endpoint: "https://api.anthropic.com/v1/messages",
      model: "claude-3-5-sonnet-20241022",
      contextWindow: 200000,
      costPer1K: 0.015,
      useFor: ["complex-reasoning", "analysis", "writing", "planning"],
      priority: 1
    },
    
    // Code generation and technical tasks
    gpt4: {
      endpoint: "https://api.openai.com/v1/chat/completions",
      model: "gpt-4-turbo-preview",
      contextWindow: 128000,
      costPer1K: 0.01,
      useFor: ["code-generation", "debugging", "refactoring", "technical-docs"],
      priority: 2
    },

    // Research and large context
    gemini: {
      endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
      model: "gemini-1.5-pro",
      contextWindow: 2000000,
      costPer1K: 0.007,
      useFor: ["research", "large-context", "web-browsing", "document-analysis"],
      priority: 3
    },

    // Local models for privacy
    local: {
      endpoint: "http://localhost:11434/api/generate",
      model: "llama3.1:8b",
      contextWindow: 32000,
      costPer1K: 0,
      useFor: ["private-data", "sensitive-operations", "offline-work"],
      priority: 4
    }
  },

  // Agent System - Your AI assistants
  agents: {
    // Tool management and external integrations
    toolAgent: {
      name: "Tool Manager",
      personality: "Efficient and resourceful",
      responsibilities: [
        "Discover and integrate new tools",
        "Manage API connections and credentials", 
        "Automate tool installations",
        "Handle external service interactions"
      ],
      model: "gpt4"
    },

    // Memory and knowledge management
    memoryAgent: {
      name: "Memory Keeper", 
      personality: "Meticulous and organized",
      responsibilities: [
        "Store and retrieve all interactions",
        "Maintain personal knowledge graph",
        "Track relationships and patterns",
        "Ensure context continuity"
      ],
      model: "claude"
    },

    // Security and access control
    securityAgent: {
      name: "Security Guardian",
      personality: "Vigilant and protective",
      responsibilities: [
        "Manage credentials securely",
        "Monitor for threats",
        "Control access permissions",
        "Audit system activities"
      ],
      model: "claude"
    },

    // Decision making and orchestration
    reasoningAgent: {
      name: "Decision Maker",
      personality: "Thoughtful and strategic", 
      responsibilities: [
        "Process complex requests",
        "Make routing decisions",
        "Coordinate other agents",
        "Plan multi-step operations"
      ],
      model: "claude"
    }
  },

  // Memory System Configuration
  memory: {
    vectorDatabase: {
      provider: "weaviate", // or "pinecone", "qdrant"
      dimensions: 1536,
      collections: ["conversations", "projects", "preferences", "knowledge"],
      retentionPolicy: "permanent" // Never forget anything
    },
    
    knowledgeGraph: {
      provider: "neo4j",
      relationships: [
        "WORKED_ON", "RELATES_TO", "DEPENDS_ON", "LEARNED_FROM",
        "PREFERS", "DISLIKES", "USES", "CREATES", "COLLABORATES_WITH"
      ]
    },

    sessionStore: {
      provider: "redis",
      ttl: null, // Sessions never expire
      persistence: true
    }
  },

  // Natural Language Processing
  nlp: {
    intentRecognition: {
      provider: "spacy", // or custom model
      confidence: 0.8,
      fallback: "ask-clarification"
    },
    
    contextExtraction: {
      windowSize: 10, // Last 10 interactions
      relevanceThreshold: 0.7
    },

    responseGeneration: {
      tone: "helpful-friend", // Friendly but professional
      verbosity: "concise", // Nathaniel likes brief responses
      proactivity: "high" // Be proactive with suggestions
    }
  },

  // System Behavior
  behavior: {
    // How the AI should act
    personality: {
      helpfulness: 10,
      proactivity: 9,
      organization: 10,
      patience: 8,
      humor: 6
    },

    // What it should remember
    memoryFocus: [
      "project-structures", "coding-patterns", "preferences",
      "common-problems", "solutions", "relationships", "goals"
    ],

    // How it should learn
    learning: {
      fromInteractions: true,
      fromMistakes: true,
      fromFeedback: true,
      fromCommunity: true, // Learn from best practices
      adaptationSpeed: "moderate" // Don't change too quickly
    }
  },

  // Integration Points
  integrations: {
    development: {
      git: { autoCommit: false, branchStrategy: "feature-branches" },
      npm: { autoInstall: true, preferredPackageManager: "npm" },
      docker: { autoContainerize: "ask-first" },
      ci: { preferredProvider: "github-actions" }
    },

    productivity: {
      calendar: { provider: "google", syncLevel: "read-only" },
      email: { provider: "gmail", automation: "minimal" },
      notes: { provider: "obsidian", autoOrganize: true },
      tasks: { provider: "todoist", createFromConversations: true }
    },

    communication: {
      slack: { presence: "auto", notifications: "important-only" },
      discord: { presence: "invisible" },
      email: { autoRespond: "never" }
    }
  },

  // Cost Management
  costOptimization: {
    dailyBudget: 10, // $10/day
    monthlyBudget: 200, // $200/month
    alertThreshold: 0.8, // Alert at 80% of budget
    autoDowngrade: true, // Use cheaper models when budget tight
    trackingLevel: "detailed"
  },

  // Security Settings
  security: {
    encryptionLevel: "AES-256",
    credentialStorage: "local-vault", // Never store in cloud
    auditLogging: true,
    accessControl: "strict",
    privateDataHandling: "local-only" // Personal data stays local
  },

  // Performance Settings
  performance: {
    responseTimeout: 30000, // 30 seconds
    concurrentAgents: 4,
    cachingEnabled: true,
    preloadCommonResponses: true
  },

  // Development Settings
  development: {
    loggingLevel: "info",
    debugMode: false,
    experimentalFeatures: true, // Nathaniel likes cutting-edge
    fallbackToManual: false // AI should figure it out
  }
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GASConfig;
} else if (typeof window !== 'undefined') {
  window.GASConfig = GASConfig;
}

export default GASConfig;