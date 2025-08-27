import { SuperClaudeCommand, CommandContext, CommandResult } from '../types';
import { BuildCommand } from './BuildCommand';
import { TestCommand } from './TestCommand';
import { ReviewCommand } from './ReviewCommand';
import { DeployCommand } from './DeployCommand';
import { DesignCommand } from './DesignCommand';
import { AnalyzeCommand } from './AnalyzeCommand';
import { RefactorCommand } from './RefactorCommand';
import { OptimizeCommand } from './OptimizeCommand';
import { DebugCommand } from './DebugCommand';
import { DocumentCommand } from './DocumentCommand';
import { GenerateCommand } from './GenerateCommand';
import { MigrateCommand } from './MigrateCommand';
import { ValidateCommand } from './ValidateCommand';
import { MonitorCommand } from './MonitorCommand';
import { BackupCommand } from './BackupCommand';
import { SyncCommand } from './SyncCommand';
import { ConfigureCommand } from './ConfigureCommand';
import { TemplateCommand } from './TemplateCommand';
import { SecurityCommand } from './SecurityCommand';
import { PerformanceCommand } from './PerformanceCommand';
import { AIAssistCommand } from './AIAssistCommand';

export interface Command {
  name: SuperClaudeCommand;
  description: string;
  execute(context: CommandContext, args?: any): Promise<CommandResult>;
  validate?(args?: any): boolean;
}

export class CommandRegistry {
  private commands = new Map<SuperClaudeCommand, Command>();
  private static instance: CommandRegistry;

  private constructor() {
    this.registerCommands();
  }

  public static getInstance(): CommandRegistry {
    if (!CommandRegistry.instance) {
      CommandRegistry.instance = new CommandRegistry();
    }
    return CommandRegistry.instance;
  }

  private registerCommands(): void {
    const commands: Command[] = [
      new BuildCommand(),
      new TestCommand(),
      new ReviewCommand(),
      new DeployCommand(),
      new DesignCommand(),
      new AnalyzeCommand(),
      new RefactorCommand(),
      new OptimizeCommand(),
      new DebugCommand(),
      new DocumentCommand(),
      new GenerateCommand(),
      new MigrateCommand(),
      new ValidateCommand(),
      new MonitorCommand(),
      new BackupCommand(),
      new SyncCommand(),
      new ConfigureCommand(),
      new TemplateCommand(),
      new SecurityCommand(),
      new PerformanceCommand(),
      new AIAssistCommand()
    ];

    commands.forEach(command => {
      this.commands.set(command.name, command);
    });
  }

  public getCommand(name: SuperClaudeCommand): Command | undefined {
    return this.commands.get(name);
  }

  public getAllCommands(): Command[] {
    return Array.from(this.commands.values());
  }

  public async executeCommand(
    name: SuperClaudeCommand,
    context: CommandContext,
    args?: any
  ): Promise<CommandResult> {
    const command = this.getCommand(name);
    
    if (!command) {
      return {
        success: false,
        error: `Command '${name}' not found`
      };
    }

    try {
      if (command.validate && !command.validate(args)) {
        return {
          success: false,
          error: `Invalid arguments for command '${name}'`
        };
      }

      const startTime = Date.now();
      const result = await command.execute(context, args);
      const executionTime = Date.now() - startTime;

      return {
        ...result,
        metadata: {
          ...result.metadata,
          executionTime
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  public listCommands(): { name: SuperClaudeCommand; description: string }[] {
    return Array.from(this.commands.values()).map(cmd => ({
      name: cmd.name,
      description: cmd.description
    }));
  }
}