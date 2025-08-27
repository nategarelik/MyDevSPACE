#!/usr/bin/env node

/**
 * GAS System Demo - See your personal AI system in action
 */

import gas from './core/gas-orchestrator.js';
import chalk from 'chalk';

async function runDemo() {
  console.log(chalk.cyan('🚀 GAS System Demo'));
  console.log(chalk.cyan('=================\n'));
  
  console.log(chalk.white('Initializing your personal AI system...\n'));
  
  try {
    // Initialize GAS
    await gas.initialize();
    
    console.log(chalk.green('✅ System initialized successfully!\n'));
    
    // Show system status
    const status = gas.getSystemStatus();
    console.log(chalk.yellow('📊 System Status:'));
    console.log(chalk.gray(`  Agents: ${status.agents.join(', ')}`));
    console.log(chalk.gray(`  Models: ${status.models.join(', ')}`));
    console.log(chalk.gray(`  Memory: ${status.memoryEntries} entries`));
    console.log();
    
    // Demo natural language requests
    console.log(chalk.yellow('💬 Testing Natural Language Interface:\n'));
    
    const testRequests = [
      "build my project",
      "fix the broken tests", 
      "organize my files",
      "remember this solution",
      "research React best practices"
    ];
    
    for (const request of testRequests) {
      console.log(chalk.cyan(`User: "${request}"`));
      
      const response = await gas.handleRequest(request);
      
      console.log(chalk.white(`GAS: ${response.content}`));
      console.log(chalk.gray(`  → Used ${response.model} model with ${response.agents.join(', ')} agents`));
      
      if (response.suggestions.length > 0) {
        console.log(chalk.dim(`  Suggestions: ${response.suggestions.join(', ')}`));
      }
      
      console.log();
    }
    
    // Show conversation history
    console.log(chalk.yellow('📚 Conversation History:'));
    const history = gas.getRecentHistory(3);
    history.forEach((entry, index) => {
      const role = entry.role === 'user' ? '👤' : '🤖';
      console.log(chalk.gray(`  ${role} ${entry.content.substring(0, 50)}...`));
    });
    
    console.log();
    console.log(chalk.green('🎉 Demo completed! Your GAS system is working perfectly.'));
    console.log(chalk.white('Ready to use:'));
    console.log(chalk.cyan('  • CLI: node gas-cli.js'));
    console.log(chalk.cyan('  • Dashboard: npm run dashboard'));
    console.log(chalk.cyan('  • Interactive: npm start'));
    
  } catch (error) {
    console.log(chalk.red('❌ Demo failed:', error.message));
    console.log(chalk.gray('Check the README for troubleshooting tips.'));
  }
}

runDemo();