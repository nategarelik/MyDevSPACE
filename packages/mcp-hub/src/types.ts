import { z } from 'zod'

export const MCPServerConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  command: z.string(),
  args: z.array(z.string()).default([]),
  env: z.record(z.string()).default({}),
  enabled: z.boolean().default(true),
  category: z.enum([
    'filesystem',
    'git',
    'database',
    'api',
    'ai',
    'communication',
    'productivity',
    'development',
    'other'
  ]),
  capabilities: z.array(z.enum([
    'read_files',
    'write_files',
    'execute_commands',
    'network_access',
    'database_access',
    'ai_integration'
  ])).default([]),
  version: z.string().optional(),
  author: z.string().optional(),
  homepage: z.string().url().optional(),
  repository: z.string().url().optional(),
})

export type MCPServerConfig = z.infer<typeof MCPServerConfigSchema>

export interface MCPServerInstance {
  config: MCPServerConfig
  status: 'idle' | 'starting' | 'running' | 'stopping' | 'error' | 'disconnected'
  process?: any // Will be properly typed when implementing
  lastError?: string
  startedAt?: Date
  restartCount: number
  stats: {
    requestCount: number
    errorCount: number
    uptime: number
  }
}

export interface MCPHubConfig {
  servers: MCPServerConfig[]
  globalSettings: {
    maxRetries: number
    retryDelay: number
    healthCheckInterval: number
    logLevel: 'debug' | 'info' | 'warn' | 'error'
  }
}

export interface MCPServerStats {
  totalServers: number
  runningServers: number
  errorServers: number
  totalRequests: number
  totalErrors: number
  averageResponseTime: number
}