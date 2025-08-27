// BMAD Core Types
export interface BMADProject {
  id: string;
  name: string;
  description: string;
  requirements: ProjectRequirements;
  architecture: ArchitectureSpec;
  currentPhase: 'planning' | 'development' | 'completed';
  created: Date;
  updated: Date;
  metadata?: any;
}

export interface ProjectRequirements {
  functionalRequirements: FunctionalRequirement[];
  nonFunctionalRequirements: NonFunctionalRequirement[];
  businessGoals: string[];
  technicalConstraints: string[];
  stakeholders: Stakeholder[];
}

export interface FunctionalRequirement {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  acceptanceCriteria: string[];
  dependencies: string[];
  estimatedEffort: number; // in story points
}

export interface NonFunctionalRequirement {
  id: string;
  type: 'performance' | 'security' | 'usability' | 'scalability' | 'reliability';
  specification: string;
  measurableTarget: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface Stakeholder {
  name: string;
  role: string;
  responsibilities: string[];
  contactInfo?: string;
}

// Architecture Specifications
export interface ArchitectureSpec {
  id: string;
  patterns: ArchitecturalPattern[];
  components: ComponentSpec[];
  dataFlow: DataFlowSpec;
  deployment: DeploymentSpec;
  security: SecuritySpec;
  performance: PerformanceSpec;
}

export interface ArchitecturalPattern {
  name: string;
  type: 'architectural' | 'design' | 'integration';
  description: string;
  benefits: string[];
  tradeoffs: string[];
  implementation: string[];
}

export interface ComponentSpec {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'database' | 'service' | 'utility';
  responsibilities: string[];
  interfaces: InterfaceSpec[];
  dependencies: string[];
  technology?: string;
}

export interface InterfaceSpec {
  name: string;
  type: 'api' | 'event' | 'database' | 'file';
  specification: string;
  dataFormat: string;
}

export interface DataFlowSpec {
  nodes: DataNode[];
  edges: DataEdge[];
  patterns: string[];
}

export interface DataNode {
  id: string;
  name: string;
  type: 'source' | 'processor' | 'sink' | 'store';
  description: string;
}

export interface DataEdge {
  from: string;
  to: string;
  dataType: string;
  protocol: string;
}

export interface DeploymentSpec {
  environment: 'cloud' | 'on-premise' | 'hybrid';
  platform: string;
  scaling: ScalingSpec;
  monitoring: MonitoringSpec;
  cicd: CICDSpec;
}

export interface ScalingSpec {
  strategy: 'horizontal' | 'vertical' | 'auto';
  triggers: string[];
  limits: { [key: string]: any };
}

export interface MonitoringSpec {
  metrics: string[];
  logging: LoggingSpec;
  alerting: AlertingSpec;
}

export interface LoggingSpec {
  level: 'debug' | 'info' | 'warn' | 'error';
  destinations: string[];
  retention: string;
}

export interface AlertingSpec {
  rules: AlertRule[];
  channels: string[];
}

export interface AlertRule {
  name: string;
  condition: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
}

export interface CICDSpec {
  pipeline: PipelineStage[];
  triggers: string[];
  environments: string[];
}

export interface PipelineStage {
  name: string;
  type: 'build' | 'test' | 'deploy' | 'validate';
  actions: string[];
  conditions: string[];
}

export interface SecuritySpec {
  authentication: AuthSpec;
  authorization: AuthzSpec;
  encryption: EncryptionSpec;
  compliance: string[];
}

export interface AuthSpec {
  methods: string[];
  providers: string[];
  mfa: boolean;
  sessionManagement: string;
}

export interface AuthzSpec {
  model: 'rbac' | 'abac' | 'custom';
  policies: PolicySpec[];
}

export interface PolicySpec {
  name: string;
  rules: string[];
  resources: string[];
}

export interface EncryptionSpec {
  atRest: EncryptionConfig;
  inTransit: EncryptionConfig;
  keyManagement: string;
}

export interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  provider: string;
}

export interface PerformanceSpec {
  targets: PerformanceTarget[];
  bottlenecks: string[];
  optimizations: string[];
}

export interface PerformanceTarget {
  metric: string;
  target: string;
  measurement: string;
}

// BMAD Agent Types
export interface BMADAgent {
  id: string;
  name: string;
  role: BMADAgentRole;
  capabilities: string[];
  status: 'active' | 'busy' | 'idle' | 'offline';
  currentTask?: BMADTask;
  performance: AgentPerformance;
}

export type BMADAgentRole = 
  | 'analyst'
  | 'product-manager' 
  | 'architect'
  | 'scrum-master'
  | 'developer'
  | 'tester'
  | 'devops'
  | 'designer';

export interface AgentPerformance {
  tasksCompleted: number;
  averageTime: number;
  successRate: number;
  qualityScore: number;
}

// BMAD Task Management
export interface BMADTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: TaskStatus;
  assignedAgent?: string;
  dependencies: string[];
  artifacts: TaskArtifact[];
  effort: TaskEffort;
  created: Date;
  updated: Date;
  completed?: Date;
}

export type TaskType = 
  | 'requirements-analysis'
  | 'architecture-design'
  | 'story-creation'
  | 'development'
  | 'testing'
  | 'deployment'
  | 'documentation'
  | 'review';

export type TaskStatus = 
  | 'backlog'
  | 'in-progress'
  | 'review'
  | 'testing'
  | 'done'
  | 'blocked';

export interface TaskArtifact {
  id: string;
  name: string;
  type: 'document' | 'code' | 'test' | 'config' | 'diagram';
  content: string;
  metadata?: any;
}

export interface TaskEffort {
  estimated: number; // hours
  actual?: number;   // hours
  complexity: 'simple' | 'medium' | 'complex';
  riskLevel: 'low' | 'medium' | 'high';
}

// BMAD Workflow Types
export interface BMADWorkflow {
  id: string;
  name: string;
  phases: WorkflowPhase[];
  currentPhase: number;
  status: 'active' | 'paused' | 'completed';
  metadata?: any;
}

export interface WorkflowPhase {
  id: string;
  name: string;
  description: string;
  tasks: string[]; // Task IDs
  dependencies: string[]; // Phase IDs
  agents: BMADAgentRole[];
  estimatedDuration: number; // days
  status: 'pending' | 'active' | 'completed';
}

// Story Generation Types
export interface StoryFile {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  technicalContext: TechnicalContext;
  dependencies: string[];
  effort: TaskEffort;
  generatedCode?: GeneratedCode;
}

export interface TechnicalContext {
  architecture: ArchitecturalContext;
  technologies: Technology[];
  patterns: string[];
  constraints: string[];
  interfaces: InterfaceContext[];
}

export interface ArchitecturalContext {
  layer: 'presentation' | 'business' | 'data' | 'integration';
  components: string[];
  patterns: string[];
  qualityAttributes: string[];
}

export interface Technology {
  name: string;
  version: string;
  purpose: string;
  configuration?: any;
}

export interface InterfaceContext {
  name: string;
  type: 'rest' | 'graphql' | 'grpc' | 'websocket' | 'event';
  specification: string;
  consumer: string;
  provider: string;
}

export interface GeneratedCode {
  files: CodeFile[];
  tests: TestFile[];
  documentation: DocumentationFile[];
}

export interface CodeFile {
  path: string;
  content: string;
  language: string;
  framework?: string;
}

export interface TestFile {
  path: string;
  content: string;
  type: 'unit' | 'integration' | 'e2e';
  coverage?: number;
}

export interface DocumentationFile {
  path: string;
  content: string;
  type: 'api' | 'user-guide' | 'technical' | 'readme';
}

// Cost Optimization Types
export interface CostOptimization {
  tokenUsage: TokenUsageStats;
  timeEfficiency: TimeEfficiencyStats;
  resourceUtilization: ResourceUtilizationStats;
  recommendations: CostRecommendation[];
}

export interface TokenUsageStats {
  totalTokens: number;
  optimizedTokens: number;
  reductionPercentage: number;
  costSavings: number; // in dollars
}

export interface TimeEfficiencyStats {
  totalTime: number; // hours
  automatedTime: number; // hours
  manualTime: number; // hours
  efficiencyGain: number; // percentage
}

export interface ResourceUtilizationStats {
  agentUtilization: { [agentId: string]: number };
  systemResources: { cpu: number; memory: number; storage: number };
  parallelization: number; // percentage of tasks running in parallel
}

export interface CostRecommendation {
  type: 'token-optimization' | 'process-improvement' | 'resource-allocation';
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  estimatedSavings: number; // dollars per month
}

// Configuration Types
export interface BMADConfig {
  version: string;
  project: ProjectConfig;
  agents: AgentConfig;
  workflow: WorkflowConfig;
  optimization: OptimizationConfig;
  integration: IntegrationConfig;
}

export interface ProjectConfig {
  defaultTemplate: string;
  requirementsValidation: boolean;
  architectureValidation: boolean;
  automaticStoryGeneration: boolean;
}

export interface AgentConfig {
  maxConcurrentTasks: number;
  taskTimeout: number; // minutes
  qualityThreshold: number; // percentage
  retryAttempts: number;
}

export interface WorkflowConfig {
  automaticProgression: boolean;
  reviewRequired: boolean;
  parallelExecution: boolean;
  checkpointFrequency: number; // minutes
}

export interface OptimizationConfig {
  tokenOptimization: boolean;
  cacheEnabled: boolean;
  compressionStrategy: 'none' | 'basic' | 'intelligent';
  costTracking: boolean;
}

export interface IntegrationConfig {
  superClaude: boolean;
  mcpServers: string[];
  externalTools: { [name: string]: any };
  webhooks: WebhookConfig[];
}

export interface WebhookConfig {
  name: string;
  url: string;
  events: string[];
  authentication?: any;
}