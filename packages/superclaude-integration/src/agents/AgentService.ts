import { Agent } from '../types';
import { SecurityEngineerAgent } from './SecurityEngineerAgent';
import { FrontendArchitectAgent } from './FrontendArchitectAgent';
import { BackendDeveloperAgent } from './BackendDeveloperAgent';
import { SystemArchitectAgent } from './SystemArchitectAgent';
import { QAEngineerAgent } from './QAEngineerAgent';
import { DevOpsEngineerAgent } from './DevOpsEngineerAgent';
import { DatabaseSpecialistAgent } from './DatabaseSpecialistAgent';
import { UIUXDesignerAgent } from './UIUXDesignerAgent';
import { ProductManagerAgent } from './ProductManagerAgent';
import { DataScientistAgent } from './DataScientistAgent';
import { PerformanceEngineerAgent } from './PerformanceEngineerAgent';
import { TechnicalWriterAgent } from './TechnicalWriterAgent';
import { ProjectManagerAgent } from './ProjectManagerAgent';
import { MLEngineerAgent } from './MLEngineerAgent';

export class AgentService {
  private agents = new Map<string, Agent>();
  private agentInstances = new Map<string, any>();
  private static instance: AgentService;

  private constructor() {
    this.initializeAgents();
  }

  public static getInstance(): AgentService {
    if (!AgentService.instance) {
      AgentService.instance = new AgentService();
    }
    return AgentService.instance;
  }

  private initializeAgents(): void {
    const agentDefinitions = [
      {
        id: 'security-engineer',
        name: 'Security Engineer',
        role: 'Security Analysis & Vulnerability Assessment',
        capabilities: [
          'Vulnerability scanning',
          'Security code review',
          'Penetration testing',
          'Compliance assessment',
          'Threat modeling'
        ],
        instance: new SecurityEngineerAgent()
      },
      {
        id: 'frontend-architect',
        name: 'Frontend Architect',
        role: 'Frontend Architecture & UI/UX Design',
        capabilities: [
          'Component design',
          'State management',
          'Performance optimization',
          'Accessibility compliance',
          'Design system creation'
        ],
        instance: new FrontendArchitectAgent()
      },
      {
        id: 'backend-developer',
        name: 'Backend Developer',
        role: 'Backend Development & API Design',
        capabilities: [
          'API development',
          'Database design',
          'Microservices architecture',
          'Performance optimization',
          'Integration development'
        ],
        instance: new BackendDeveloperAgent()
      },
      {
        id: 'system-architect',
        name: 'System Architect',
        role: 'System Architecture & Infrastructure Design',
        capabilities: [
          'System design',
          'Scalability planning',
          'Technology stack selection',
          'Architecture patterns',
          'Infrastructure planning'
        ],
        instance: new SystemArchitectAgent()
      },
      {
        id: 'qa-engineer',
        name: 'QA Engineer',
        role: 'Quality Assurance & Testing',
        capabilities: [
          'Test strategy planning',
          'Automated testing',
          'Performance testing',
          'Test case generation',
          'Quality metrics analysis'
        ],
        instance: new QAEngineerAgent()
      },
      {
        id: 'devops-engineer',
        name: 'DevOps Engineer',
        role: 'DevOps & Infrastructure Automation',
        capabilities: [
          'CI/CD pipeline design',
          'Infrastructure as Code',
          'Container orchestration',
          'Monitoring setup',
          'Deployment automation'
        ],
        instance: new DevOpsEngineerAgent()
      },
      {
        id: 'database-specialist',
        name: 'Database Specialist',
        role: 'Database Design & Optimization',
        capabilities: [
          'Database schema design',
          'Query optimization',
          'Data migration',
          'Backup strategies',
          'Performance tuning'
        ],
        instance: new DatabaseSpecialistAgent()
      },
      {
        id: 'ui-ux-designer',
        name: 'UI/UX Designer',
        role: 'User Interface & Experience Design',
        capabilities: [
          'User research',
          'Wireframe creation',
          'Prototyping',
          'Usability testing',
          'Design system development'
        ],
        instance: new UIUXDesignerAgent()
      },
      {
        id: 'product-manager',
        name: 'Product Manager',
        role: 'Product Strategy & Requirements',
        capabilities: [
          'Requirements gathering',
          'Product roadmap planning',
          'Stakeholder management',
          'Feature prioritization',
          'User story creation'
        ],
        instance: new ProductManagerAgent()
      },
      {
        id: 'data-scientist',
        name: 'Data Scientist',
        role: 'Data Analysis & Machine Learning',
        capabilities: [
          'Data analysis',
          'Machine learning models',
          'Statistical analysis',
          'Data visualization',
          'Predictive analytics'
        ],
        instance: new DataScientistAgent()
      },
      {
        id: 'performance-engineer',
        name: 'Performance Engineer',
        role: 'Performance Optimization & Monitoring',
        capabilities: [
          'Performance profiling',
          'Load testing',
          'Optimization strategies',
          'Monitoring setup',
          'Capacity planning'
        ],
        instance: new PerformanceEngineerAgent()
      },
      {
        id: 'technical-writer',
        name: 'Technical Writer',
        role: 'Documentation & Communication',
        capabilities: [
          'API documentation',
          'User guides',
          'Technical specifications',
          'Code documentation',
          'Knowledge base management'
        ],
        instance: new TechnicalWriterAgent()
      },
      {
        id: 'project-manager',
        name: 'Project Manager',
        role: 'Project Planning & Coordination',
        capabilities: [
          'Project planning',
          'Resource allocation',
          'Timeline management',
          'Risk assessment',
          'Team coordination'
        ],
        instance: new ProjectManagerAgent()
      },
      {
        id: 'ml-engineer',
        name: 'ML Engineer',
        role: 'Machine Learning Engineering',
        capabilities: [
          'ML pipeline development',
          'Model deployment',
          'Feature engineering',
          'Model optimization',
          'MLOps implementation'
        ],
        instance: new MLEngineerAgent()
      }
    ];

    agentDefinitions.forEach(agentDef => {
      const agent: Agent = {
        id: agentDef.id,
        name: agentDef.name,
        role: agentDef.role,
        capabilities: agentDef.capabilities,
        status: 'active',
        lastActivity: new Date()
      };
      
      this.agents.set(agentDef.id, agent);
      this.agentInstances.set(agentDef.id, agentDef.instance);
    });
  }

  public async getAgent(id: string): Promise<Agent | undefined> {
    const agent = this.agents.get(id);
    if (agent) {
      agent.lastActivity = new Date();
      agent.status = 'active';
    }
    return agent;
  }

  public async getAgentInstance(id: string): Promise<any> {
    return this.agentInstances.get(id);
  }

  public getAllAgents(): Agent[] {
    return Array.from(this.agents.values());
  }

  public getAgentsByCapability(capability: string): Agent[] {
    return Array.from(this.agents.values())
      .filter(agent => agent.capabilities.some(cap => 
        cap.toLowerCase().includes(capability.toLowerCase())
      ));
  }

  public async executeAgentTask(agentId: string, task: any): Promise<any> {
    const agentInstance = this.agentInstances.get(agentId);
    const agent = this.agents.get(agentId);
    
    if (!agentInstance || !agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    agent.status = 'busy';
    agent.lastActivity = new Date();

    try {
      const result = await agentInstance.execute(task);
      agent.status = 'active';
      return result;
    } catch (error) {
      agent.status = 'active';
      throw error;
    }
  }

  public getAgentStatus(): { [key: string]: Agent } {
    const status: { [key: string]: Agent } = {};
    this.agents.forEach((agent, id) => {
      status[id] = agent;
    });
    return status;
  }

  public async coordinateMultiAgentTask(task: any, requiredCapabilities: string[]): Promise<any> {
    const relevantAgents = requiredCapabilities
      .map(capability => this.getAgentsByCapability(capability))
      .flat()
      .reduce((unique, agent) => {
        if (!unique.find(a => a.id === agent.id)) {
          unique.push(agent);
        }
        return unique;
      }, [] as Agent[]);

    const results = await Promise.all(
      relevantAgents.map(agent => 
        this.executeAgentTask(agent.id, {
          ...task,
          focus: agent.capabilities.filter(cap => 
            requiredCapabilities.some(req => 
              cap.toLowerCase().includes(req.toLowerCase())
            )
          )
        })
      )
    );

    return {
      agentsUsed: relevantAgents.map(a => a.name),
      results: results,
      coordinatedInsight: this.synthesizeResults(results)
    };
  }

  private synthesizeResults(results: any[]): string {
    return 'Multi-agent analysis complete with coordinated insights';
  }
}