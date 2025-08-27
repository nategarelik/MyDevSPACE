#!/usr/bin/env node

/**
 * GAS CLI - Natural Language Interface to Your Personal AI System
 * 
 * Usage:
 *   gas "build my project"
 *   gas "fix the broken tests"
 *   gas "organize my files"
 *   gas "remember this architecture pattern"
 * 
 * No commands needed - just tell it what you want!
 */

import readline from 'readline';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import gas from './core/gas-orchestrator.js';

class GASCLI {
  constructor() {
    this.rl = null;
    this.isInteractive = false;
  }

  /**
   * Display welcome message
   */
  showWelcome() {
    console.log(boxen(
      chalk.cyan.bold('GAS - Garelik Agentic System') + '\n' +
      chalk.white('Your Personal AI Operating System') + '\n\n' +
      chalk.gray('Just tell me what you need - no commands required!') + '\n' +
      chalk.gray('Examples:') + '\n' +
      chalk.yellow('  "build my project"') + '\n' +
      chalk.yellow('  "fix what\'s broken"') + '\n' +
      chalk.yellow('  "organize my files"') + '\n' +
      chalk.yellow('  "remember this for later"'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'rounded',
        borderColor: 'cyan'
      }
    ));
  }

  /**
   * Handle single command
   */
  async handleCommand(input) {
    if (!input || input.trim().length === 0) {
      console.log(chalk.yellow('Please tell me what you need help with.'));
      return;
    }

    const spinner = ora('Thinking...').start();
    
    try {
      const response = await gas.handleRequest(input.trim());
      
      spinner.stop();
      
      // Display response
      console.log('\n' + chalk.cyan('🤖 GAS:'));
      console.log(chalk.white(response.content));
      
      // Show action result if any
      if (response.actionResult) {
        const { success, message, error } = response.actionResult;
        if (success) {
          console.log(chalk.green('✅ ' + message));
        } else {
          console.log(chalk.red('❌ ' + (error || message)));
        }
      }
      
      // Show suggestions if any
      if (response.suggestions && response.suggestions.length > 0) {
        console.log(chalk.gray('\nSuggestions:'));
        response.suggestions.forEach(suggestion => {
          console.log(chalk.gray('  • ' + suggestion));
        });
      }
      
      // Show debug info in verbose mode
      if (process.env.GAS_VERBOSE) {
        console.log(chalk.dim(`\n[Model: ${response.model}, Agents: ${response.agents.join(', ')}]`));
      }
      
    } catch (error) {
      spinner.stop();
      console.log(chalk.red('❌ Error: ' + error.message));
      console.log(chalk.gray('Please try rephrasing your request or contact support.'));
    }
  }

  /**
   * Start interactive mode
   */
  async startInteractive() {
    this.isInteractive = true;
    this.showWelcome();
    
    // Initialize GAS system
    const initSpinner = ora('Starting GAS system...').start();
    try {
      await gas.initialize();
      initSpinner.succeed('GAS system ready');
    } catch (error) {
      initSpinner.fail('Failed to start GAS system');
      console.log(chalk.red(error.message));
      process.exit(1);
    }
    
    // Set up readline interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.cyan('🧠 GAS > ')
    });

    console.log(chalk.gray('\nType your request in natural language or "exit" to quit.'));
    this.rl.prompt();

    this.rl.on('line', async (input) => {
      const trimmed = input.trim();
      
      if (trimmed === 'exit' || trimmed === 'quit') {
        this.rl.close();
        return;
      }
      
      if (trimmed === 'help') {
        this.showHelp();
        this.rl.prompt();
        return;
      }
      
      if (trimmed === 'status') {
        this.showStatus();
        this.rl.prompt();
        return;
      }
      
      if (trimmed.length > 0) {
        await this.handleCommand(trimmed);
      }
      
      this.rl.prompt();
    });

    this.rl.on('close', () => {
      console.log(chalk.cyan('\n👋 Goodbye! GAS is always here when you need help.'));
      process.exit(0);
    });
  }

  /**
   * Show help information
   */
  showHelp() {
    console.log(chalk.cyan('\n🤖 GAS Help'));
    console.log(chalk.white('============\n'));
    
    console.log(chalk.white('Natural Language Commands:'));
    console.log(chalk.gray('  Just tell me what you want to do!'));
    console.log(chalk.yellow('  "build my project"'));
    console.log(chalk.yellow('  "run the tests"'));
    console.log(chalk.yellow('  "fix the broken code"'));
    console.log(chalk.yellow('  "create a new React component"'));
    console.log(chalk.yellow('  "optimize this for performance"'));
    console.log(chalk.yellow('  "organize my project files"'));
    console.log(chalk.yellow('  "remember this solution"'));
    console.log(chalk.yellow('  "research the best practice for..."'));
    
    console.log(chalk.white('\nSystem Commands:'));
    console.log(chalk.gray('  status  - Show system status'));
    console.log(chalk.gray('  help    - Show this help'));
    console.log(chalk.gray('  exit    - Exit GAS'));
    
    console.log(chalk.white('\nEnvironment:'));
    console.log(chalk.gray('  GAS_VERBOSE=true - Show debug information'));
    console.log(chalk.gray('  GAS_MODEL=<name> - Override default model'));
  }

  /**
   * Show system status
   */
  showStatus() {
    const status = gas.getSystemStatus();
    const capabilities = gas.getCapabilities();
    
    console.log(chalk.cyan('\n📊 GAS System Status'));
    console.log(chalk.white('==================\n'));
    
    console.log(chalk.white('System:'));
    console.log(chalk.gray(`  Initialized: ${status.initialized ? '✅' : '❌'}`));
    console.log(chalk.gray(`  Active Agents: ${status.agents.length}`));
    console.log(chalk.gray(`  Connected Models: ${status.models.length}`));
    console.log(chalk.gray(`  Conversations: ${status.conversationCount}`));
    console.log(chalk.gray(`  Memory Entries: ${status.memoryEntries}`));
    
    console.log(chalk.white('\nCapabilities:'));
    Object.entries(capabilities).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      const name = key.replace(/([A-Z])/g, ' $1').toLowerCase();
      console.log(chalk.gray(`  ${name}: ${status}`));
    });
    
    console.log(chalk.white('\nModels:'));
    status.models.forEach(model => {
      console.log(chalk.gray(`  • ${model}`));
    });
    
    console.log(chalk.white('\nAgents:'));
    status.agents.forEach(agent => {
      console.log(chalk.gray(`  • ${agent}`));
    });
  }

  /**
   * Handle command line arguments
   */
  async run() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
      // No arguments - start interactive mode
      await this.startInteractive();
    } else if (args[0] === '--help' || args[0] === '-h') {
      this.showHelp();
    } else if (args[0] === '--status') {
      // Initialize first to get status
      await gas.initialize();
      this.showStatus();
    } else if (args[0] === '--version' || args[0] === '-v') {
      console.log('GAS (Garelik Agentic System) v1.0.0');
    } else {
      // Treat all arguments as a single natural language command
      const command = args.join(' ');
      await this.handleCommand(command);
    }
  }
}

// Handle uncaught errors gracefully
process.on('uncaughtException', (error) => {
  console.log(chalk.red('\n❌ Unexpected error:', error.message));
  console.log(chalk.gray('Please report this issue or try restarting GAS.'));
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log(chalk.red('\n❌ Promise rejection:', error.message));
  console.log(chalk.gray('Please report this issue or try restarting GAS.'));
  process.exit(1);
});

// Run the CLI
const cli = new GASCLI();
cli.run().catch(error => {
  console.error(chalk.red('Failed to start GAS CLI:', error.message));
  process.exit(1);
});

export default GASCLI;