export interface SuperClaudeConfig {
  apiKey?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
  timeout?: number;
}

export interface CommandContext {
  projectPath: string;
  workingDirectory: string;
  environment: 'development' | 'staging' | 'production';
  userId?: string;
  sessionId: string;
}

export interface CommandResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    tokenUsage?: number;
    executionTime?: number;
    agentUsed?: string;
  };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: 'active' | 'idle' | 'busy' | 'offline';
  lastActivity?: Date;
}

export interface MCPServer {
  id: string;
  name: string;
  type: 'context7' | 'sequential' | 'magic' | 'playwright' | 'morphllm' | 'serena';
  url: string;
  status: 'connected' | 'disconnected' | 'error';
  capabilities: string[];
}

export type SuperClaudeCommand = 
  | 'sc:build'
  | 'sc:test' 
  | 'sc:review'
  | 'sc:deploy'
  | 'sc:design'
  | 'sc:analyze'
  | 'sc:refactor'
  | 'sc:optimize'
  | 'sc:debug'
  | 'sc:document'
  | 'sc:generate'
  | 'sc:migrate'
  | 'sc:validate'
  | 'sc:monitor'
  | 'sc:backup'
  | 'sc:sync'
  | 'sc:configure'
  | 'sc:template'
  | 'sc:security'
  | 'sc:performance'
  | 'sc:ai-assist';

export interface TokenOptimization {
  originalTokens: number;
  optimizedTokens: number;
  reductionPercentage: number;
  compressionStrategy: 'context' | 'semantic' | 'intelligent' | 'hybrid';
}