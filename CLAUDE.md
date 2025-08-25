# Claude Code Integration Guide

## Overview
This document contains specific instructions and context for Claude Code when working with the Ultimate AI IDE project.

## Project Context
The Ultimate AI IDE is a comprehensive development environment that integrates Claude Code with advanced organization, logging, and multi-agent AI capabilities. It's built as a modern monorepo using cutting-edge 2025 technologies.

## Key Commands & Workflows

### Development Setup
```bash
# Initial setup
npm install
cp .env.example .env
docker-compose up -d

# Start development
npm run dev

# Build all packages
npm run build

# Run tests
npm run test
```

### MCP Server Management
```bash
# Start MCP Hub
npm run mcp:start

# Connect to specific servers
npm run mcp:connect notion
npm run mcp:connect github
npm run mcp:connect filesystem
```

### AI Agent Commands
```bash
# Deploy code reviewer agent
npm run agent:deploy code-reviewer

# Run file organizer
npm run agent:organize

# Execute backup manager
npm run agent:backup
```

## Important File Locations

### Configuration Files
- `claude.json` - Main Claude Code configuration
- `.env` - Environment variables (DO NOT COMMIT)
- `turbo.json` - Turborepo build configuration
- `docker-compose.yml` - Docker services configuration

### Core Packages
- `apps/web/` - Next.js 15 web application
- `packages/ui/` - Shared shadcn/ui components
- `packages/mcp-hub/` - MCP server integrations
- `packages/ai-agents/` - Agent orchestration

### Original MVP Files
- `index.html` - Original dashboard HTML (preserved for reference)
- `app.js` - Original JavaScript logic
- `style.css` - Original styles
- `ultimate_ai_ide_roadmap.json` - Development roadmap
- `ultimate_ai_ide_tech_spec.json` - Technical specifications

## Environment Variables Required
```bash
# Critical for operation
CLAUDE_API_KEY=          # Your Claude API key
OPENAI_API_KEY=          # OpenAI API key
SUPABASE_URL=            # Supabase project URL
SUPABASE_ANON_KEY=       # Supabase anonymous key

# Integrations
GITHUB_TOKEN=            # GitHub personal access token
NOTION_TOKEN=            # Notion integration token
SLACK_BOT_TOKEN=         # Slack bot token
```

## Code Style & Conventions

### TypeScript/JavaScript
- Use TypeScript for all new code
- Prefer functional components with hooks
- Use async/await over promises
- Follow ESLint rules

### Component Structure
```typescript
// Use this pattern for React components
import { FC } from 'react'
import { cn } from '@/lib/utils'

interface ComponentProps {
  // Props definition
}

export const Component: FC<ComponentProps> = ({ ...props }) => {
  // Component logic
  return (
    // JSX
  )
}
```

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Hooks: `use-hook-name.ts`
- Types: `types.ts` or `component.types.ts`

## MCP Server Integration Points

### Available Servers
1. **Filesystem** - File operations with access control
2. **Git** - Repository management
3. **Memory** - Persistent knowledge storage
4. **Sequential Thinking** - Problem-solving workflows
5. **Notion** - Documentation and workspace
6. **GitHub** - Code repository management
7. **Slack** - Team communication

### Adding New MCP Servers
```typescript
// In packages/mcp-hub/src/servers/
export class NewMCPServer extends BaseMCPServer {
  // Implementation
}
```

## AI Agent Development

### Agent Types
- **Code Reviewer**: Analyzes code quality and suggests improvements
- **File Organizer**: Automatically organizes project files
- **Backup Manager**: Handles multi-destination backups
- **Project Planner**: Manages project tasks and milestones

### Creating New Agents
```typescript
// In packages/ai-agents/src/agents/
export class CustomAgent extends BaseAgent {
  async execute(task: AgentTask): Promise<AgentResult> {
    // Agent logic
  }
}
```

## Testing Guidelines

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Production Build
```bash
npm run build
docker build -t ultimate-ai-ide .
```

### Environment-specific configs
- Development: `.env.development`
- Staging: `.env.staging`
- Production: `.env.production`

## Troubleshooting

### Common Issues
1. **Port conflicts**: Check if ports 3000, 8000, 9000 are in use
2. **Docker issues**: Run `docker-compose down -v` and restart
3. **Build failures**: Clear cache with `npm run clean`
4. **Type errors**: Run `npm run type-check`

### Debug Mode
Set `DEBUG=*` in environment variables for verbose logging

## Security Considerations
- Never commit `.env` files
- Use environment-specific secrets
- Implement rate limiting for API endpoints
- Enable CORS only for trusted domains
- Use Row Level Security in Supabase

## Performance Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Use dynamic imports for code splitting
- Cache API responses with React Query
- Optimize images with Next.js Image component

## Contact & Support
- GitHub Issues: Report bugs and feature requests
- Discord: Join development discussions
- Documentation: Check `/docs` folder

## Quick Reference

### Git Workflow
```bash
git add .
git commit -m "feat: description"
git push origin main
```

### Docker Commands
```bash
docker-compose up -d     # Start services
docker-compose logs -f   # View logs
docker-compose down      # Stop services
```

### NPM Scripts
```bash
npm run dev             # Development mode
npm run build           # Production build
npm run lint            # Code linting
npm run format          # Format code
```

---
*This file is specifically for Claude Code context. Keep it updated with project-specific instructions.*