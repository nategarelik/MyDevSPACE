#!/usr/bin/env node

/**
 * GAS System Tests - Verify your personal AI system works
 */

import gas from '../core/gas-orchestrator.js';
import chalk from 'chalk';

class GASTest {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.tests = [];
  }

  async runAllTests() {
    console.log(chalk.cyan('🧪 GAS System Tests'));
    console.log(chalk.white('==================\n'));

    await this.testSystemInitialization();
    await this.testNaturalLanguageProcessing();
    await this.testIntentRecognition();
    await this.testModelSelection();
    await this.testAgentOrchestration();
    await this.testMemorySystem();
    await this.testResponseGeneration();

    this.showResults();
  }

  async testSystemInitialization() {
    console.log(chalk.yellow('Testing system initialization...'));
    
    try {
      await gas.initialize();
      const status = gas.getSystemStatus();
      
      this.assert(status.initialized, 'System should be initialized');
      this.assert(status.agents.length > 0, 'Agents should be loaded');
      this.assert(status.models.length > 0, 'Models should be connected');
      
      console.log(chalk.green('✅ System initialization passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ System initialization failed:', error.message));
      this.failed++;
    }
  }

  async testNaturalLanguageProcessing() {
    console.log(chalk.yellow('Testing natural language processing...'));
    
    try {
      const testInputs = [
        "build my project",
        "fix the broken tests", 
        "organize my files",
        "remember this solution",
        "research React best practices"
      ];

      for (const input of testInputs) {
        const response = await gas.handleRequest(input);
        this.assert(response.content, `Should generate response for: "${input}"`);
        this.assert(response.model, `Should select a model for: "${input}"`);
        this.assert(response.agents && response.agents.length > 0, `Should select agents for: "${input}"`);
      }

      console.log(chalk.green('✅ Natural language processing passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Natural language processing failed:', error.message));
      this.failed++;
    }
  }

  async testIntentRecognition() {
    console.log(chalk.yellow('Testing intent recognition...'));
    
    try {
      const testCases = [
        { input: "build my project", expectedAction: "build" },
        { input: "run the tests", expectedAction: "test" },
        { input: "fix this bug", expectedAction: "fix" },
        { input: "create a new component", expectedAction: "create" },
        { input: "organize my files", expectedAction: "organize" }
      ];

      for (const testCase of testCases) {
        const intent = await gas.parseIntent(testCase.input);
        this.assert(intent.action === testCase.expectedAction, 
          `Intent for "${testCase.input}" should be "${testCase.expectedAction}", got "${intent.action}"`);
        this.assert(intent.confidence > 0.5, `Confidence should be > 0.5 for "${testCase.input}"`);
      }

      console.log(chalk.green('✅ Intent recognition passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Intent recognition failed:', error.message));
      this.failed++;
    }
  }

  async testModelSelection() {
    console.log(chalk.yellow('Testing model selection...'));
    
    try {
      const testCases = [
        { intent: { action: "create", domain: "development" }, expectedModel: "gpt4" },
        { intent: { action: "analyze", domain: "general" }, expectedModel: "claude" },
        { intent: { action: "research", domain: "research" }, expectedModel: "gemini" },
        { intent: { action: "remember", domain: "memory" }, expectedModel: "local" }
      ];

      for (const testCase of testCases) {
        const model = gas.selectBestModel(testCase.intent);
        this.assert(model === testCase.expectedModel,
          `Model for ${testCase.intent.action} should be ${testCase.expectedModel}, got ${model}`);
      }

      console.log(chalk.green('✅ Model selection passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Model selection failed:', error.message));
      this.failed++;
    }
  }

  async testAgentOrchestration() {
    console.log(chalk.yellow('Testing agent orchestration...'));
    
    try {
      const testCases = [
        { intent: { action: "create", domain: "development" }, expectedAgents: ["memoryAgent", "toolAgent"] },
        { intent: { action: "fix", domain: "problem-solving" }, expectedAgents: ["memoryAgent", "securityAgent", "reasoningAgent"] },
        { intent: { action: "remember", domain: "memory" }, expectedAgents: ["memoryAgent", "securityAgent"] }
      ];

      for (const testCase of testCases) {
        const agents = gas.selectAgents(testCase.intent);
        for (const expectedAgent of testCase.expectedAgents) {
          this.assert(agents.includes(expectedAgent),
            `Agents for ${testCase.intent.action} should include ${expectedAgent}`);
        }
      }

      console.log(chalk.green('✅ Agent orchestration passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Agent orchestration failed:', error.message));
      this.failed++;
    }
  }

  async testMemorySystem() {
    console.log(chalk.yellow('Testing memory system...'));
    
    try {
      // Test conversation history
      gas.addToHistory('user', 'test message', {});
      const history = gas.getRecentHistory(1);
      this.assert(history.length === 1, 'Should store conversation history');
      this.assert(history[0].content === 'test message', 'Should store correct message content');

      // Test personal knowledge
      this.assert(gas.personalKnowledge.size > 0, 'Should have personal knowledge loaded');

      console.log(chalk.green('✅ Memory system passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Memory system failed:', error.message));
      this.failed++;
    }
  }

  async testResponseGeneration() {
    console.log(chalk.yellow('Testing response generation...'));
    
    try {
      const testRequest = "help me build my project";
      const response = await gas.handleRequest(testRequest);
      
      this.assert(response.content, 'Should generate response content');
      this.assert(response.model, 'Should specify which model was used');
      this.assert(response.agents, 'Should specify which agents were used');
      this.assert(response.intent, 'Should include parsed intent');

      console.log(chalk.green('✅ Response generation passed\n'));
      this.passed++;
    } catch (error) {
      console.log(chalk.red('❌ Response generation failed:', error.message));
      this.failed++;
    }
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  showResults() {
    console.log(chalk.cyan('📊 Test Results'));
    console.log(chalk.white('=============\n'));
    
    console.log(chalk.green(`✅ Passed: ${this.passed}`));
    console.log(chalk.red(`❌ Failed: ${this.failed}`));
    console.log(chalk.white(`📈 Total: ${this.passed + this.failed}`));
    
    const successRate = Math.round((this.passed / (this.passed + this.failed)) * 100);
    console.log(chalk.white(`🎯 Success Rate: ${successRate}%\n`));

    if (this.failed === 0) {
      console.log(chalk.green('🎉 All tests passed! Your GAS system is ready.'));
      console.log(chalk.cyan('You can now start using: gas "what you want to do"'));
    } else {
      console.log(chalk.yellow(`⚠️  ${this.failed} test(s) failed. Check the implementation.`));
    }
  }
}

// Run tests if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new GASTest();
  tester.runAllTests().catch(error => {
    console.error(chalk.red('Test runner failed:', error.message));
    process.exit(1);
  });
}

export default GASTest;