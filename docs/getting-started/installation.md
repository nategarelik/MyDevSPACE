# Installation Guide

> Get Ultimate AI IDE running in less than 2 minutes

## 🚀 Quick Installation (Recommended)

### Method 1: Global NPM Install
```bash
# Install globally for system-wide access
npm install -g @ultimate-ai/core

# Verify installation
ultimate-ai --version
# Expected: Ultimate AI IDE v1.0.0 (SuperClaude v4.40.0 + BMAD v5.1.3)
```

### Method 2: Local Project Setup
```bash
# Create new project with Ultimate AI
npx create-ultimate-ai my-project
cd my-project

# Start development
npm run ai:dev
```

### Method 3: Clone & Build (Development)
```bash
# Clone repository
git clone https://github.com/your-username/ultimate-ai-ide
cd ultimate-ai-ide

# Install dependencies
npm install

# Build all packages
npm run build

# Run local version
./bin/ultimate-ai --version
```

## 🔧 System Requirements

### Minimum Requirements
- **Node.js**: >= 18.0.0
- **NPM**: >= 9.0.0
- **Memory**: 4GB RAM
- **Storage**: 2GB free space

### Recommended Setup
- **Node.js**: >= 20.0.0 (latest LTS)
- **NPM**: >= 10.0.0
- **Memory**: 8GB+ RAM
- **Storage**: 5GB+ free space
- **OS**: Windows 10+, macOS 12+, Ubuntu 20.04+

## ⚙️ Configuration Setup

### 1. Environment Variables
Create `.env` file in your project root:

```bash
# Required: AI API Keys
CLAUDE_API_KEY=your_claude_api_key
OPENAI_API_KEY=your_openai_api_key  # Optional but recommended

# Optional: Enhanced Integrations
GITHUB_TOKEN=your_github_token
NOTION_TOKEN=your_notion_token
SLACK_BOT_TOKEN=your_slack_token

# Optional: Database (for advanced features)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Optional: MCP Servers
MCP_CONTEXT7_URL=ws://localhost:9001/context7
MCP_SEQUENTIAL_URL=ws://localhost:9002/sequential
```

### 2. Configuration File
The system creates `.ultimate-ai.config.js` automatically, but you can customize:

```javascript
module.exports = {
  // SuperClaude V4.40.0 Settings
  superclaude: {
    tokenOptimization: {
      enabled: true,
      targetReduction: 70  // 70% token reduction goal
    },
    agents: {
      // Enable/disable specific AI agents
      'security-engineer': { enabled: true, priority: 'high' },
      'frontend-architect': { enabled: true, priority: 'high' }
    }
  },
  
  // BMAD Method V5.1.3 Settings
  bmad: {
    phases: {
      planning: { enabled: true },
      development: { contextPreservationTarget: 90 }
    }
  },
  
  // Integration Mode
  integration: {
    mode: 'hybrid'  // 'superclaude-only' | 'bmad-only' | 'hybrid'
  }
};
```

## ✅ Verify Installation

Run the comprehensive health check:

```bash
ultimate-ai doctor
```

Expected output:
```
🏥 Ultimate AI IDE Health Check
═════════════════════════════

✅ Node.js (v20.10.0)
✅ NPM (v10.2.0)
✅ Ultimate AI Core (v1.0.0)
✅ SuperClaude V4.40.0 Integration
✅ BMAD V5.1.3 Orchestrator
✅ Token Optimizer (70% reduction ready)
✅ 14 AI Agents Available
✅ 21 Commands Available
✅ 6 MCP Servers Configured

🎉 All systems operational!
Ready for revolutionary AI-powered development.
```

## 🐛 Troubleshooting

### Common Issues

#### "ultimate-ai command not found"
```bash
# If installed globally but not found:
npm list -g @ultimate-ai/core

# If not installed:
npm install -g @ultimate-ai/core

# If installed but PATH issue:
echo $PATH  # Check if npm global bin is in PATH
npm config get prefix  # Should match PATH entry
```

#### "API Key Invalid"
```bash
# Test Claude API connection
ultimate-ai test --service claude

# Test OpenAI API connection  
ultimate-ai test --service openai

# Check environment variables
ultimate-ai config --show-env
```

#### "Build Fails"
```bash
# Clear cache and rebuild
ultimate-ai clean
npm run build

# Check Node.js version
node --version  # Should be >= 18.0.0

# Update dependencies
npm update
```

#### "Permission Errors"
```bash
# On Linux/macOS, fix npm permissions:
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Or use node version manager (recommended):
# Install nvm: https://nvm.sh
nvm install --lts
nvm use --lts
```

### Advanced Diagnostics

#### Enable Debug Mode
```bash
# Run with full debug output
DEBUG=* ultimate-ai --debug <command>

# SuperClaude-specific debugging
DEBUG=superclaude:* ultimate-ai sc:build

# BMAD-specific debugging
DEBUG=bmad:* ultimate-ai bmad:plan
```

#### Performance Issues
```bash
# Check system resources
ultimate-ai system-info

# Monitor token usage
ultimate-ai monitor --tokens --duration 60

# Profile command performance
ultimate-ai profile sc:build --project my-app
```

## 🔄 Updates & Maintenance

### Update Ultimate AI
```bash
# Update globally installed version
npm update -g @ultimate-ai/core

# Update local project version
npm update @ultimate-ai/core

# Check for updates
ultimate-ai update --check
```

### Maintenance Tasks
```bash
# Clean build cache
ultimate-ai clean --cache

# Reset configuration to defaults
ultimate-ai config --reset

# Backup current configuration
ultimate-ai config --backup

# Restore from backup
ultimate-ai config --restore backup-2024-01-15.json
```

## 🏢 Enterprise Installation

### Docker Deployment
```bash
# Pull official Docker image
docker pull ultimateai/ultimate-ai-ide:latest

# Run with local project mount
docker run -v $(pwd):/workspace ultimateai/ultimate-ai-ide:latest
```

### Kubernetes Deployment
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ultimate-ai-ide
spec:
  template:
    spec:
      containers:
      - name: ultimate-ai
        image: ultimateai/ultimate-ai-ide:latest
        env:
        - name: CLAUDE_API_KEY
          valueFrom:
            secretKeyRef:
              name: ai-secrets
              key: claude-api-key
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Setup Ultimate AI IDE
  run: |
    npm install -g @ultimate-ai/core
    ultimate-ai doctor

- name: AI-Powered Build
  run: |
    ultimate-ai sc:build --optimize
    ultimate-ai sc:test --coverage
```

## 📞 Need Help?

- **📖 Documentation**: [docs.ultimate-ai-ide.com](https://docs.ultimate-ai-ide.com)
- **💬 Discord**: [discord.gg/ultimate-ai](https://discord.gg/ultimate-ai)
- **🐛 Issues**: [github.com/ultimate-ai-ide/issues](https://github.com/ultimate-ai-ide/issues)
- **📧 Email**: support@ultimate-ai-ide.com

---

**Next Step**: [Complete the Quick Start Tutorial](./quick-start.md) to build your first AI-powered project! 🚀