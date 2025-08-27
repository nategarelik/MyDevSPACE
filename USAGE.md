# 🚀 Ultimate AI IDE Usage Guide

> Complete guide to using SuperClaude V4.40.0 + BMAD Method V5.1.3

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Core Commands](#core-commands)
- [SuperClaude V4.40.0](#superclaude-v4400)
- [BMAD Method V5.1.3](#bmad-method-v513)
- [Hybrid Workflows](#hybrid-workflows)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### 1. Installation & Setup
```bash
# Install Ultimate AI IDE
npm install -g @ultimate-ai/core

# Verify installation
ultimate-ai --version
# Ultimate AI IDE v1.0.0
# ├── SuperClaude V4.40.0 (70% token reduction, 21 commands, 14 AI agents)
# ├── BMAD Method V5.1.3 (intelligent planning, context engineering)
# └── 6 MCP Server integrations

# Health check
ultimate-ai doctor
```

### 2. Initialize Your First Project
```bash
# Create new AI-powered project
ultimate-ai init my-revolutionary-app --template web-app

# Navigate to project
cd my-revolutionary-app

# Start AI-enhanced development
ultimate-ai dev --mode hybrid
```

### 3. Experience Revolutionary Development
```bash
# AI-optimized build (70% token reduction)
ultimate-ai sc:build --optimize

# Multi-agent code review (14 AI experts)
ultimate-ai sc:review --agents all

# Intelligent planning phase
ultimate-ai bmad:plan "Feature Name" requirement1 requirement2

# Complete hybrid workflow
ultimate-ai workflow:full --project "My App"
```

## 🎯 Core Commands

### System Commands
```bash
ultimate-ai init [name]           # Initialize new AI project
ultimate-ai dev [--mode hybrid]   # Start development server
ultimate-ai doctor                # System health check
ultimate-ai --help                # Show all commands
ultimate-ai --version             # Show version info
```

### Quick Actions
```bash
ultimate-ai build                 # Hybrid AI-optimized build
ultimate-ai review                # Smart code review
ultimate-ai demo                  # Interactive demonstration
ultimate-ai test                  # Run validation tests
```

## ⚡ SuperClaude V4.40.0

### Token Optimization (70% Reduction)
```bash
# Basic optimization
ultimate-ai sc:optimize "Your content here"

# Advanced optimization with strategy
ultimate-ai sc:optimize --strategy hybrid --focus performance,clarity

# Monitor token usage
ultimate-ai monitor --tokens --duration 60
```

### 21 Specialized Commands
```bash
# Build & Deploy
ultimate-ai sc:build --optimize           # AI-optimized build
ultimate-ai sc:deploy --target production # Smart deployment
ultimate-ai sc:test --coverage            # AI test generation

# Code Quality
ultimate-ai sc:review --agents security,performance
ultimate-ai sc:refactor --target modern   # AI refactoring
ultimate-ai sc:validate --rules strict    # Code validation

# Analysis & Debug
ultimate-ai sc:analyze --deep             # Deep code analysis
ultimate-ai sc:debug --intelligent        # AI debugging
ultimate-ai sc:security --scan thorough   # Security audit

# Documentation & Generation
ultimate-ai sc:document --auto            # Auto documentation
ultimate-ai sc:generate --component Button # Code generation
ultimate-ai sc:template --type component   # Template creation

# Performance & Monitoring
ultimate-ai sc:performance --profile      # Performance analysis
ultimate-ai sc:monitor --realtime         # Real-time monitoring
ultimate-ai sc:backup --intelligent       # Smart backup

# Migration & Sync
ultimate-ai sc:migrate --from react16 --to react18
ultimate-ai sc:sync --destinations notion,github
ultimate-ai sc:configure --auto           # Smart configuration

# AI Assistance
ultimate-ai sc:ai-assist "How do I optimize React performance?"
ultimate-ai sc:design --component "Login Form"
```

### 14 AI Agents
```bash
# Security & Architecture
ultimate-ai sc:review --agents security-engineer
ultimate-ai sc:build --agents frontend-architect,backend-developer

# Development & Testing
ultimate-ai sc:test --agents qa-engineer
ultimate-ai sc:deploy --agents devops-engineer

# Data & Performance
ultimate-ai sc:analyze --agents data-scientist,performance-engineer
ultimate-ai sc:optimize --agents database-specialist

# Management & Documentation
ultimate-ai sc:plan --agents product-manager,project-manager
ultimate-ai sc:document --agents technical-writer

# UI/UX & ML
ultimate-ai sc:design --agents ui-ux-designer
ultimate-ai sc:ai-assist --agents ml-engineer

# System Architecture
ultimate-ai sc:architect --agents system-architect
```

## 🧠 BMAD Method V5.1.3

### Phase 1: Intelligent Planning
```bash
# Basic planning
ultimate-ai bmad:plan "E-commerce Platform"

# Detailed planning with constraints
ultimate-ai bmad:plan "Task Manager" \
  --requirements "auth,tasks,collaboration" \
  --timeline "4 weeks" \
  --budget "20k" \
  --team 5

# Interactive planning mode
ultimate-ai bmad:plan "My App" --interactive

# Planning with specific focus
ultimate-ai bmad:plan "API Service" \
  --focus "scalability,security" \
  --complexity high
```

### Phase 2: Context-Engineered Development
```bash
# Basic development phase
ultimate-ai bmad:develop

# Development with context
ultimate-ai bmad:develop --context ./planning-results.json

# Development with story generation
ultimate-ai bmad:develop --generate-stories --preserve-context

# Monitor context preservation
ultimate-ai bmad:context --check --target 90
```

### Task Sharding
```bash
# Automatic task breakdown
ultimate-ai bmad:shard "Complex Feature Implementation"

# Task sharding with strategy
ultimate-ai bmad:shard --strategy complexity-based --max-size 8

# Custom sharding parameters
ultimate-ai bmad:shard "Build E-commerce" \
  --strategy feature-based \
  --team-size 4 \
  --time-box "1 week"
```

### Cost Optimization
```bash
# Cost analysis
ultimate-ai bmad:optimize --analyze-costs

# Budget tracking
ultimate-ai bmad:optimize --budget 15000 --track monthly

# Resource optimization
ultimate-ai bmad:optimize --resources --efficiency
```

## 🔄 Hybrid Workflows

### Full Project Workflow
```bash
# Complete project workflow (Planning → Development → Build)
ultimate-ai workflow:full "My Revolutionary App" \
  --requirements "auth,api,dashboard" \
  --mode hybrid

# Workflow with specific agents
ultimate-ai workflow:full --agents security,frontend,backend

# Workflow with optimization focus
ultimate-ai workflow:full --optimize tokens,performance,cost
```

### Smart Code Review
```bash
# Comprehensive review (SuperClaude + BMAD)
ultimate-ai workflow:review --scope full

# Focused review
ultimate-ai workflow:review --focus security,performance

# Review with specific depth
ultimate-ai workflow:review --depth comprehensive --agents all
```

### Intelligent Build
```bash
# Hybrid build system
ultimate-ai workflow:build --hybrid

# Build with optimization
ultimate-ai workflow:build --optimize --target production

# Build with specific agents
ultimate-ai workflow:build --agents frontend-architect,devops-engineer
```

## ⚙️ Configuration

### Configuration File (`.ultimate-ai.config.js`)
```javascript
module.exports = {
  // SuperClaude V4.40.0 Settings
  superclaude: {
    tokenOptimization: {
      enabled: true,
      targetReduction: 70,  // 70% reduction goal
      strategy: 'hybrid'    // 'context' | 'semantic' | 'intelligent' | 'hybrid'
    },
    agents: {
      'security-engineer': { enabled: true, priority: 'high' },
      'frontend-architect': { enabled: true, priority: 'high' },
      'backend-developer': { enabled: true, priority: 'high' }
    }
  },
  
  // BMAD Method V5.1.3 Settings
  bmad: {
    phases: {
      planning: {
        enabled: true,
        agents: ['business-analyst', 'product-manager', 'system-architect']
      },
      development: {
        enabled: true,
        contextPreservationTarget: 90  // >90% context preservation
      }
    },
    taskSharding: {
      strategy: 'complexity-based',  // 'time-boxed' | 'complexity-based' | 'feature-based'
      maxTaskComplexity: 8
    }
  },
  
  // Integration Settings
  integration: {
    mode: 'hybrid',  // 'superclaude-only' | 'bmad-only' | 'hybrid'
    autoOptimize: true,
    progressIndicators: true
  }
};
```

### Environment Variables (`.env`)
```bash
# Required: AI API Keys
CLAUDE_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_openai_api_key

# Optional: Enhanced Integrations
GITHUB_TOKEN=your_github_token
NOTION_TOKEN=your_notion_token
SLACK_BOT_TOKEN=your_slack_token

# Optional: MCP Servers
MCP_CONTEXT7_URL=ws://localhost:9001/context7
MCP_SEQUENTIAL_URL=ws://localhost:9002/sequential
```

### CLI Configuration
```bash
# Show current configuration
ultimate-ai config --show

# Update configuration
ultimate-ai config --set superclaude.tokenOptimization.targetReduction=75

# Reset to defaults
ultimate-ai config --reset

# Validate configuration
ultimate-ai config --validate
```

## 📚 Examples

### Example 1: Web Application Development
```bash
# 1. Initialize project
ultimate-ai init ecommerce-app --template web-app

# 2. Plan with BMAD
ultimate-ai bmad:plan "E-commerce Platform" \
  auth,products,cart,checkout,admin \
  --timeline "8 weeks" --team 6

# 3. Generate architecture
ultimate-ai sc:architect --agents system-architect,security-engineer

# 4. Develop with context preservation
ultimate-ai bmad:develop --preserve-context --generate-stories

# 5. Build with optimization
ultimate-ai sc:build --optimize --agents frontend-architect

# 6. Review for quality
ultimate-ai sc:review --agents all --comprehensive
```

### Example 2: API Service Development
```bash
# 1. Initialize microservice
ultimate-ai init user-api --template api-service

# 2. Security-first planning
ultimate-ai bmad:plan "User Management API" \
  --focus security,scalability \
  --agents security-engineer,backend-developer

# 3. Database design
ultimate-ai sc:design --agents database-specialist \
  --schema users,sessions,permissions

# 4. Implementation with context
ultimate-ai bmad:develop --context ./api-requirements.json

# 5. Testing strategy
ultimate-ai sc:test --agents qa-engineer --coverage comprehensive

# 6. Deployment preparation
ultimate-ai sc:deploy --agents devops-engineer --target staging
```

### Example 3: Legacy Modernization
```bash
# 1. Analyze existing codebase
ultimate-ai sc:analyze --legacy --deep

# 2. Plan modernization strategy
ultimate-ai bmad:plan "Legacy Modernization" \
  --current-tech "jQuery,PHP" \
  --target-tech "React,Node.js"

# 3. Migration planning
ultimate-ai sc:migrate --from jquery --to react \
  --agents frontend-architect

# 4. Gradual refactoring
ultimate-ai sc:refactor --strategy incremental \
  --preserve-functionality

# 5. Testing during transition
ultimate-ai sc:test --regression --agents qa-engineer

# 6. Performance validation
ultimate-ai sc:performance --compare before,after
```

## 🛠 Advanced Usage

### Token Optimization Strategies
```bash
# Context-aware optimization
ultimate-ai sc:optimize --strategy context --preserve-meaning

# Semantic clustering
ultimate-ai sc:optimize --strategy semantic --cluster-similar

# Intelligent filtering
ultimate-ai sc:optimize --strategy intelligent --ai-analysis

# Hybrid approach (recommended)
ultimate-ai sc:optimize --strategy hybrid --max-reduction 75
```

### Multi-Agent Coordination
```bash
# Sequential agent workflow
ultimate-ai coordinate \
  --agents security-engineer,frontend-architect,backend-developer \
  --strategy sequential

# Parallel agent execution
ultimate-ai coordinate \
  --agents qa-engineer,performance-engineer,devops-engineer \
  --strategy parallel

# Hierarchical coordination
ultimate-ai coordinate \
  --lead system-architect \
  --team frontend-architect,backend-developer,database-specialist
```

### Performance Monitoring
```bash
# Real-time system monitoring
ultimate-ai monitor --realtime --duration 30m

# Token usage analytics
ultimate-ai monitor --tokens --agents all --export csv

# Performance profiling
ultimate-ai profile --command sc:build --iterations 10

# Cost tracking
ultimate-ai monitor --costs --budget 1000 --alert 80%
```

## 🚨 Troubleshooting

### Common Issues

#### "Command not found: ultimate-ai"
```bash
# Check if installed globally
npm list -g @ultimate-ai/core

# Reinstall if needed
npm install -g @ultimate-ai/core

# Check PATH
echo $PATH
npm config get prefix
```

#### "Token optimization not working"
```bash
# Check API keys
ultimate-ai config --show-env

# Test optimization
ultimate-ai sc:optimize "test content" --debug

# Verify configuration
ultimate-ai config --validate
```

#### "BMAD planning fails"
```bash
# Check system health
ultimate-ai doctor

# Debug planning
ultimate-ai bmad:plan "test" --debug

# Reset BMAD configuration
ultimate-ai config --reset bmad
```

### Debug Mode
```bash
# Enable debug output for any command
DEBUG=* ultimate-ai sc:build

# SuperClaude-specific debugging
DEBUG=superclaude:* ultimate-ai sc:optimize

# BMAD-specific debugging
DEBUG=bmad:* ultimate-ai bmad:plan "test project"
```

### Performance Issues
```bash
# System resource check
ultimate-ai system-info

# Clear cache
ultimate-ai clean --cache --temp

# Optimize configuration
ultimate-ai config --optimize
```

## 📞 Support

- **📖 Documentation**: [docs.ultimate-ai-ide.com](https://docs.ultimate-ai-ide.com)
- **💬 Discord**: [discord.gg/ultimate-ai](https://discord.gg/ultimate-ai)
- **🐛 Issues**: [github.com/ultimate-ai-ide/issues](https://github.com/ultimate-ai-ide/issues)
- **📧 Email**: support@ultimate-ai-ide.com

---

**Ready to revolutionize your development workflow?** 🚀

Start with: `ultimate-ai init my-revolutionary-project --template web-app`