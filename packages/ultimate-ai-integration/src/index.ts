// Main Ultimate AI IDE Integration
import { UltimateAI } from './UltimateAI';
export { UltimateAI };

// Export version information
export const ULTIMATE_AI_VERSION = '1.0.0';
export const INTEGRATION_BUILD = Date.now().toString();

// Export configuration helpers
export const createUltimateAIConfig = (overrides?: any) => ({
  superClaude: {
    enabled: true,
    tokenOptimization: true,
    evidenceBasedOperation: true,
    ...overrides?.superClaude
  },
  bmad: {
    enabled: true,
    intelligentPlanning: true,
    contextEngineering: true,
    taskSharding: true,
    ...overrides?.bmad
  },
  integration: {
    hybridWorkflow: true,
    crossSystemOptimization: true,
    unifiedAnalytics: true,
    ...overrides?.integration
  }
});

// Export convenience instance
export const ultimateAI = UltimateAI.getInstance();

// Mock services for testing and development
export const AgentService = ultimateAI.getAgentService();
export const MCPService = ultimateAI.getMCPService();
export const BMADOrchestrator = ultimateAI.getBMADOrchestrator();

// Export main class as default
export default UltimateAI;

/**
 * Quick start function for immediate use
 */
export async function startUltimateAI(config?: any): Promise<UltimateAI> {
  const ai = UltimateAI.getInstance(config);
  await ai.initialize();
  return ai;
}

/**
 * Utility function to demonstrate capabilities
 */
export async function demonstrateCapabilities(): Promise<void> {
  console.log('Ultimate AI IDE - August 2025 Revolutionary Features');
  console.log('====================================================');
  
  const ai = UltimateAI.getInstance();
  await ai.initialize();
  
  const status = ai.getSystemStatus();
  const capabilities = ai.getCapabilities();
  const stats = ai.getOptimizationStats();
  
  console.log('\nSystem Status:', JSON.stringify(status, null, 2));
  console.log('\nCapabilities:', JSON.stringify(capabilities, null, 2));
  console.log('\nOptimization Stats:', JSON.stringify(stats, null, 2));
  
  console.log('\nReady to revolutionize your development workflow!');
}