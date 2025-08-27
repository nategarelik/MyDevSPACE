# Problem-Solving Matrix for Claude Code

> Intelligent problem diagnosis and solution mapping for Ultimate AI IDE

## 🎯 Problem Recognition Patterns

### Performance Issues
**User Indicators:**
- "slow", "laggy", "performance", "memory", "CPU usage", "optimization"
- "app is slow", "takes too long", "performance issues"

**Immediate Response:**
```bash
ultimate-ai sc:performance --profile
ultimate-ai sc:optimize --strategy hybrid
ultimate-ai sc:review --agents performance-engineer
```

### Security Concerns
**User Indicators:**
- "security", "vulnerability", "hack", "auth", "authentication", "authorization"
- "secure", "protect", "encryption", "GDPR", "compliance"

**Immediate Response:**
```bash
ultimate-ai sc:security --scan thorough
ultimate-ai sc:review --agents security-engineer
ultimate-ai sc:analyze --focus security
```

### Build/Deployment Problems
**User Indicators:**
- "build fails", "deployment error", "won't deploy", "production issues"
- "CI/CD", "pipeline", "docker", "container"

**Immediate Response:**
```bash
ultimate-ai sc:build --optimize --debug
ultimate-ai sc:deploy --target staging --validate
ultimate-ai sc:review --agents devops-engineer
```

### Frontend/UI Issues
**User Indicators:**
- "UI", "component", "React", "styling", "responsive", "mobile"
- "design", "UX", "user interface", "layout", "CSS"

**Immediate Response:**
```bash
ultimate-ai sc:design --component [component-name]
ultimate-ai sc:review --agents frontend-architect,ui-ux-designer
ultimate-ai sc:refactor --target modern --focus frontend
```

### Backend/API Problems
**User Indicators:**
- "API", "endpoint", "server", "database", "backend", "503", "500 error"
- "microservice", "REST", "GraphQL", "SQL"

**Immediate Response:**
```bash
ultimate-ai sc:analyze --focus backend
ultimate-ai sc:review --agents backend-developer,database-specialist
ultimate-ai sc:test --focus api
```

### Testing Issues
**User Indicators:**
- "test", "testing", "unit test", "integration test", "coverage"
- "test fails", "broken tests", "QA"

**Immediate Response:**
```bash
ultimate-ai sc:test --coverage --generate
ultimate-ai sc:review --agents qa-engineer
ultimate-ai sc:debug --focus testing
```

## 🔍 Diagnostic Decision Tree

```
User Problem
    ├── Performance Related?
    │   ├── Yes → sc:performance + performance-engineer
    │   └── No → Continue
    │
    ├── Security Related?
    │   ├── Yes → sc:security + security-engineer  
    │   └── No → Continue
    │
    ├── Build/Deploy Related?
    │   ├── Yes → sc:build + sc:deploy + devops-engineer
    │   └── No → Continue
    │
    ├── Frontend Related?
    │   ├── Yes → sc:design + frontend-architect + ui-ux-designer
    │   └── No → Continue
    │
    ├── Backend Related?
    │   ├── Yes → sc:analyze + backend-developer + database-specialist
    │   └── No → Continue
    │
    └── General Issue → sc:debug + sc:analyze + multiple agents
```

## 🧩 Multi-Dimensional Problem Matrix

| Problem Type | Primary Command | Secondary Command | AI Agent(s) | Follow-up |
|--------------|----------------|-------------------|-------------|-----------|
| **Performance** | `sc:performance --profile` | `sc:optimize --strategy hybrid` | `performance-engineer` | Monitor & validate |
| **Security** | `sc:security --scan thorough` | `sc:review --agents security-engineer` | `security-engineer` | Implement fixes |
| **Build Issues** | `sc:build --optimize --debug` | `sc:analyze --focus build` | `devops-engineer` | Test build process |
| **Frontend Bugs** | `sc:debug --intelligent` | `sc:review --agents frontend-architect` | `frontend-architect, ui-ux-designer` | Component testing |
| **Backend Errors** | `sc:analyze --deep` | `sc:test --focus api` | `backend-developer, database-specialist` | API validation |
| **Database** | `sc:analyze --focus database` | `sc:optimize --target database` | `database-specialist` | Query optimization |
| **Authentication** | `sc:security --focus auth` | `sc:review --agents security-engineer` | `security-engineer` | Security audit |
| **Deployment** | `sc:deploy --validate` | `sc:configure --auto` | `devops-engineer` | Infrastructure check |
| **Testing** | `sc:test --coverage --generate` | `sc:review --agents qa-engineer` | `qa-engineer` | Test automation |
| **Documentation** | `sc:document --auto` | `sc:review --agents technical-writer` | `technical-writer` | Content validation |

## 🎨 Context-Aware Solution Patterns

### New Feature Development
```bash
# 1. Plan with BMAD methodology
ultimate-ai bmad:plan "Feature Name" --requirements "list,of,requirements"

# 2. Context-engineered development
ultimate-ai bmad:develop --preserve-context

# 3. Multi-agent review
ultimate-ai sc:review --agents system-architect,frontend-architect,backend-developer
```

### Legacy Code Modernization
```bash
# 1. Deep analysis of existing code
ultimate-ai sc:analyze --legacy --comprehensive

# 2. Modernization planning
ultimate-ai bmad:plan "Legacy Modernization" --current-tech "old" --target-tech "new"

# 3. Incremental refactoring
ultimate-ai sc:refactor --strategy incremental --preserve-functionality
```

### Emergency Bug Fixes
```bash
# 1. Rapid diagnosis
ultimate-ai sc:debug --intelligent --priority critical

# 2. Multi-agent emergency response
ultimate-ai sc:review --agents all --emergency

# 3. Quick fix validation
ultimate-ai sc:test --focus regression --fast
```

### Performance Optimization Sprint
```bash
# 1. Comprehensive profiling
ultimate-ai sc:performance --profile --deep

# 2. Multi-angle optimization
ultimate-ai sc:optimize --strategy hybrid --target performance,tokens

# 3. Validation testing
ultimate-ai sc:test --performance --benchmark
```

## 🔧 Advanced Problem-Solving Strategies

### Complex Multi-System Issues

1. **System Health Check**
   ```bash
   ultimate-ai doctor --comprehensive
   ```

2. **Multi-Agent Consultation**
   ```bash
   ultimate-ai sc:review --agents system-architect,security-engineer,performance-engineer --collaborative
   ```

3. **Root Cause Analysis**
   ```bash
   ultimate-ai sc:analyze --deep --trace-dependencies
   ```

### Unknown/Ambiguous Problems

1. **Intelligent Diagnostic**
   ```bash
   ultimate-ai sc:debug --intelligent --explore
   ```

2. **Context Analysis**
   ```bash
   ultimate-ai sc:analyze --context --patterns
   ```

3. **Multi-Agent Brainstorm**
   ```bash
   ultimate-ai sc:review --agents all --brainstorm
   ```

## 📊 Success Metrics Tracking

After implementing solutions, verify success:

```bash
# Performance verification
ultimate-ai sc:performance --compare before,after

# Security validation  
ultimate-ai sc:security --verify fixes

# Quality assessment
ultimate-ai sc:review --agents qa-engineer --quality-gate

# Token optimization confirmation
ultimate-ai sc:optimize --measure-savings
```

## 🧠 Cognitive Load Reduction

**For Claude Code:** Always start with these three commands for any unclear problem:

1. `ultimate-ai sc:analyze --intelligent` - Understand the problem
2. `ultimate-ai sc:review --agents [relevant-agent]` - Get expert insight  
3. `ultimate-ai sc:debug --strategy systematic` - Systematic solution approach

## 🎯 Quick Reference Cheat Sheet

| Problem Keyword | Instant Command | Agent | Purpose |
|----------------|----------------|-------|---------|
| "optimize" | `sc:optimize --strategy hybrid` | `performance-engineer` | Token + performance optimization |
| "secure" | `sc:security --scan thorough` | `security-engineer` | Security audit |
| "test" | `sc:test --coverage` | `qa-engineer` | Comprehensive testing |
| "build" | `sc:build --optimize` | `devops-engineer` | AI-optimized build |
| "deploy" | `sc:deploy --intelligent` | `devops-engineer` | Smart deployment |
| "debug" | `sc:debug --intelligent` | Multiple | Problem diagnosis |
| "plan" | `bmad:plan` | `product-manager` | Intelligent planning |
| "review" | `sc:review --agents all` | All 14 agents | Comprehensive review |

---

*This matrix leverages the revolutionary problem-solving capabilities of 14 AI agents with 70% token optimization and >90% context preservation*