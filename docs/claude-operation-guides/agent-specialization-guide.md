# AI Agent Specialization Guide for Claude Code

> Comprehensive guide to the 14 domain-expert AI agents and their optimal usage patterns

## 🤖 Complete Agent Roster

### 🛡️ Security Engineer Agent
**Specialization:** Security vulnerabilities, authentication, data protection
**When to Invoke:**
- User mentions: "security", "vulnerability", "hack", "auth", "encrypt"
- Security audits, penetration testing, compliance
- Authentication/authorization issues

**Commands:**
```bash
ultimate-ai sc:security --scan thorough
ultimate-ai sc:review --agents security-engineer
ultimate-ai sc:analyze --focus security
```

**Expertise Areas:**
- OWASP Top 10 vulnerabilities
- JWT/OAuth implementation
- Data encryption and protection
- GDPR/SOC2 compliance
- Security testing and validation

### 🎨 Frontend Architect Agent
**Specialization:** React, UI architecture, modern frontend patterns
**When to Invoke:**
- User mentions: "React", "component", "UI", "frontend", "responsive"
- Component design and architecture
- State management problems

**Commands:**
```bash
ultimate-ai sc:design --component "ComponentName"
ultimate-ai sc:review --agents frontend-architect
ultimate-ai sc:refactor --target modern --focus frontend
```

**Expertise Areas:**
- React 18+ patterns and hooks
- Component architecture design
- State management (Redux, Zustand, Context)
- Performance optimization (React.memo, useMemo)
- Modern CSS-in-JS solutions

### ⚙️ Backend Developer Agent
**Specialization:** APIs, server-side logic, microservices
**When to Invoke:**
- User mentions: "API", "server", "backend", "endpoint", "microservice"
- Server-side errors and debugging
- Database integration issues

**Commands:**
```bash
ultimate-ai sc:analyze --focus backend
ultimate-ai sc:review --agents backend-developer
ultimate-ai sc:test --focus api
```

**Expertise Areas:**
- RESTful API design
- GraphQL implementation
- Microservices architecture
- Server-side validation
- API documentation and testing

### 🏗️ System Architect Agent
**Specialization:** High-level architecture, scalability, design patterns
**When to Invoke:**
- User mentions: "architecture", "scalability", "design pattern", "system design"
- Planning large applications
- Architecture reviews and decisions

**Commands:**
```bash
ultimate-ai sc:review --agents system-architect
ultimate-ai bmad:plan --agents system-architect
ultimate-ai sc:architect --focus scalability
```

**Expertise Areas:**
- System design patterns
- Microservices vs monolith decisions
- Scalability planning
- Technology stack recommendations
- Architecture documentation

### 🧪 QA Engineer Agent
**Specialization:** Testing strategies, quality assurance, automation
**When to Invoke:**
- User mentions: "test", "testing", "QA", "quality", "coverage"
- Test failures or missing tests
- Quality assurance processes

**Commands:**
```bash
ultimate-ai sc:test --coverage --generate
ultimate-ai sc:review --agents qa-engineer
ultimate-ai sc:validate --comprehensive
```

**Expertise Areas:**
- Test automation strategies
- Unit/integration/e2e testing
- Test coverage optimization
- Quality gates and standards
- Bug detection and prevention

### 🚀 DevOps Engineer Agent
**Specialization:** Deployment, CI/CD, infrastructure, monitoring
**When to Invoke:**
- User mentions: "deploy", "CI/CD", "docker", "kubernetes", "infrastructure"
- Deployment failures
- Infrastructure optimization

**Commands:**
```bash
ultimate-ai sc:deploy --target production
ultimate-ai sc:configure --infrastructure
ultimate-ai sc:monitor --setup
```

**Expertise Areas:**
- CI/CD pipeline design
- Container orchestration
- Infrastructure as Code
- Monitoring and alerting
- Zero-downtime deployments

### 🗄️ Database Specialist Agent
**Specialization:** Database design, queries, optimization, data modeling
**When to Invoke:**
- User mentions: "database", "SQL", "query", "data model", "performance"
- Database performance issues
- Schema design decisions

**Commands:**
```bash
ultimate-ai sc:analyze --focus database
ultimate-ai sc:review --agents database-specialist
ultimate-ai sc:optimize --target database
```

**Expertise Areas:**
- Database schema design
- Query optimization
- Indexing strategies
- Data migration patterns
- NoSQL vs SQL decisions

### 🎨 UI/UX Designer Agent
**Specialization:** User experience, design systems, accessibility
**When to Invoke:**
- User mentions: "UX", "design", "user experience", "accessibility", "usability"
- Design system creation
- User interface improvements

**Commands:**
```bash
ultimate-ai sc:design --focus ux
ultimate-ai sc:review --agents ui-ux-designer
ultimate-ai sc:validate --accessibility
```

**Expertise Areas:**
- User experience design
- Design system creation
- Accessibility (WCAG) compliance
- Responsive design patterns
- User research and testing

### 📊 Product Manager Agent
**Specialization:** Requirements, feature planning, roadmaps, prioritization
**When to Invoke:**
- User mentions: "requirements", "feature", "roadmap", "priority", "planning"
- Feature planning and prioritization
- Product strategy decisions

**Commands:**
```bash
ultimate-ai bmad:plan --agents product-manager
ultimate-ai sc:review --agents product-manager --focus requirements
ultimate-ai sc:analyze --business-value
```

**Expertise Areas:**
- Feature prioritization (MoSCoW, RICE)
- Requirements gathering
- User story creation
- Product roadmap planning
- Stakeholder communication

### 📊 Data Scientist Agent
**Specialization:** Analytics, machine learning, data analysis, insights
**When to Invoke:**
- User mentions: "analytics", "data", "insights", "machine learning", "AI"
- Data analysis requirements
- ML model implementation

**Commands:**
```bash
ultimate-ai sc:analyze --data-insights
ultimate-ai sc:review --agents data-scientist
ultimate-ai sc:generate --ml-model
```

**Expertise Areas:**
- Data analysis and visualization
- Machine learning algorithms
- Statistical analysis
- A/B testing design
- Data pipeline architecture

### ⚡ Performance Engineer Agent
**Specialization:** Optimization, profiling, load testing, scalability
**When to Invoke:**
- User mentions: "performance", "slow", "optimization", "memory", "CPU"
- Performance bottlenecks
- Scalability concerns

**Commands:**
```bash
ultimate-ai sc:performance --profile
ultimate-ai sc:optimize --strategy performance
ultimate-ai sc:review --agents performance-engineer
```

**Expertise Areas:**
- Performance profiling
- Memory optimization
- Load testing strategies
- Caching implementations
- Scalability patterns

### 📝 Technical Writer Agent
**Specialization:** Documentation, API docs, guides, knowledge management
**When to Invoke:**
- User mentions: "documentation", "docs", "guide", "README", "API docs"
- Documentation creation/updates
- Knowledge management systems

**Commands:**
```bash
ultimate-ai sc:document --auto
ultimate-ai sc:review --agents technical-writer
ultimate-ai sc:generate --documentation
```

**Expertise Areas:**
- API documentation
- Technical writing best practices
- Documentation automation
- Knowledge base organization
- User guides and tutorials

### 📅 Project Manager Agent
**Specialization:** Project planning, task management, timeline, coordination
**When to Invoke:**
- User mentions: "project", "timeline", "tasks", "coordination", "milestone"
- Project planning and organization
- Team coordination issues

**Commands:**
```bash
ultimate-ai bmad:plan --agents project-manager
ultimate-ai sc:organize --project
ultimate-ai sc:timeline --estimate
```

**Expertise Areas:**
- Project planning methodologies
- Task breakdown structures
- Timeline estimation
- Resource allocation
- Risk management

### 🤖 ML Engineer Agent
**Specialization:** Machine learning, neural networks, AI models, training
**When to Invoke:**
- User mentions: "ML", "machine learning", "neural network", "AI model", "training"
- ML model development
- AI integration requirements

**Commands:**
```bash
ultimate-ai sc:ai-assist --ml-focus
ultimate-ai sc:review --agents ml-engineer
ultimate-ai sc:generate --ai-model
```

**Expertise Areas:**
- ML model architecture
- Neural network design
- Model training and evaluation
- AI/ML integration patterns
- MLOps practices

## 🎯 Agent Selection Matrix

### Problem Domain → Agent Mapping

| Problem Domain | Primary Agent | Secondary Agent | Tertiary Agent |
|---------------|---------------|-----------------|----------------|
| **Authentication** | `security-engineer` | `backend-developer` | `frontend-architect` |
| **React Components** | `frontend-architect` | `ui-ux-designer` | `system-architect` |
| **API Design** | `backend-developer` | `system-architect` | `database-specialist` |
| **Performance Issues** | `performance-engineer` | `system-architect` | `database-specialist` |
| **Database Queries** | `database-specialist` | `backend-developer` | `performance-engineer` |
| **Deployment Problems** | `devops-engineer` | `system-architect` | `security-engineer` |
| **UI/UX Improvements** | `ui-ux-designer` | `frontend-architect` | `product-manager` |
| **Feature Planning** | `product-manager` | `system-architect` | `technical-writer` |
| **Testing Strategy** | `qa-engineer` | `backend-developer` | `frontend-architect` |
| **Documentation** | `technical-writer` | `system-architect` | `product-manager` |

## 🔄 Multi-Agent Collaboration Patterns

### Sequential Collaboration
For complex problems requiring multiple perspectives:

```bash
# 1. Architecture design
ultimate-ai sc:review --agents system-architect

# 2. Implementation review  
ultimate-ai sc:review --agents frontend-architect,backend-developer

# 3. Security validation
ultimate-ai sc:review --agents security-engineer

# 4. Quality assurance
ultimate-ai sc:review --agents qa-engineer
```

### Parallel Consultation
For comprehensive analysis:

```bash
# All relevant agents simultaneously
ultimate-ai sc:review --agents system-architect,security-engineer,performance-engineer --collaborative
```

### Hierarchical Decision Making
For strategic decisions:

```bash
# 1. Strategic input
ultimate-ai sc:review --agents product-manager,system-architect

# 2. Technical implementation
ultimate-ai sc:review --agents frontend-architect,backend-developer,database-specialist

# 3. Quality and deployment
ultimate-ai sc:review --agents qa-engineer,devops-engineer
```

## 🧠 Agent Invocation Intelligence

### Smart Agent Selection Logic

```bash
# If user mentions security → security-engineer + relevant domain expert
ultimate-ai sc:security --agents security-engineer,[domain-specific-agent]

# If user mentions performance → performance-engineer + system-architect  
ultimate-ai sc:performance --agents performance-engineer,system-architect

# If user mentions new feature → product-manager + system-architect + domain experts
ultimate-ai bmad:plan --agents product-manager,system-architect,[domain-agents]
```

### Context-Aware Agent Combinations

| Context | Agent Combination | Reasoning |
|---------|------------------|-----------|
| **New API Feature** | `product-manager`, `system-architect`, `backend-developer`, `security-engineer` | Planning, architecture, implementation, security |
| **UI Performance Issue** | `performance-engineer`, `frontend-architect`, `ui-ux-designer` | Performance analysis, implementation, UX impact |
| **Database Migration** | `database-specialist`, `backend-developer`, `devops-engineer` | Schema design, application changes, deployment |
| **Security Incident** | `security-engineer`, `system-architect`, `devops-engineer` | Security analysis, architectural impact, rapid deployment |

## 💡 Advanced Agent Utilization

### Agent-Specific Optimization Commands

```bash
# Security-optimized build
ultimate-ai sc:build --optimize --agents security-engineer

# Performance-focused refactoring  
ultimate-ai sc:refactor --agents performance-engineer --target optimization

# UX-centered design review
ultimate-ai sc:design --agents ui-ux-designer --focus user-experience

# Architecture-guided planning
ultimate-ai bmad:plan --agents system-architect --focus scalability
```

### Emergency Response Agent Teams

```bash
# Critical bug team
ultimate-ai sc:debug --agents qa-engineer,backend-developer,devops-engineer --priority critical

# Security incident team
ultimate-ai sc:security --agents security-engineer,system-architect,devops-engineer --emergency

# Performance crisis team  
ultimate-ai sc:performance --agents performance-engineer,database-specialist,system-architect --urgent
```

## 🎯 Agent Success Metrics

Each agent tracks specific success metrics:

- **Security Engineer**: Vulnerabilities found/fixed, compliance score
- **Performance Engineer**: Load time improvements, resource optimization
- **QA Engineer**: Test coverage increase, bug detection rate
- **DevOps Engineer**: Deployment success rate, downtime reduction
- **System Architect**: Scalability improvements, architectural debt reduction

---

*Leverage the collective intelligence of 14 domain experts for revolutionary development efficiency with >90% context preservation*