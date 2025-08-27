import { EventEmitter } from 'eventemitter3';
import { CostOptimization, TokenUsageStats, TimeEfficiencyStats, ResourceUtilizationStats, CostRecommendation } from '../types';

interface CostTrackingEntry {
  timestamp: Date;
  operation: string;
  tokenUsage: number;
  optimizedTokens: number;
  timeSpent: number;
  agentsUsed: string[];
  costSaved: number;
}

interface MonthlyStats {
  month: string;
  totalTokens: number;
  optimizedTokens: number;
  costSaved: number;
  timeEfficiency: number;
  operationCount: number;
}

export class CostOptimizer extends EventEmitter {
  private costHistory: CostTrackingEntry[] = [];
  private monthlyStats = new Map<string, MonthlyStats>();
  private tokenCostPerThousand = 0.02; // $0.02 per 1K tokens (approximate)
  private developerHourlyCost = 75; // $75/hour average developer cost
  private alertThreshold = 100; // Alert when savings exceed $100

  constructor() {
    super();
    this.initializeMonthlyStats();
  }

  /**
   * Track phase completion and associated costs
   */
  public async trackPhaseCompletion(
    phase: 'planning' | 'development',
    duration: number,
    tokenUsage: { original: number; optimized: number; reduction: number }
  ): Promise<void> {
    const costSaved = this.calculateTokenCostSaved(tokenUsage.original, tokenUsage.optimized);
    const timeSaved = this.calculateTimeSaved(duration, phase);
    
    const entry: CostTrackingEntry = {
      timestamp: new Date(),
      operation: `bmad-${phase}`,
      tokenUsage: tokenUsage.original,
      optimizedTokens: tokenUsage.optimized,
      timeSpent: duration,
      agentsUsed: this.getPhaseAgents(phase),
      costSaved: costSaved + (timeSaved * this.developerHourlyCost)
    };
    
    this.costHistory.push(entry);
    this.updateMonthlyStats(entry);
    
    // Emit alert if significant savings
    if (entry.costSaved > this.alertThreshold) {
      this.emit('significantSavings', {
        phase,
        saved: entry.costSaved,
        tokenReduction: tokenUsage.reduction,
        timeSaved
      });
    }
    
    console.log(`💰 Cost optimization tracked for ${phase}: $${entry.costSaved.toFixed(2)} saved`);
  }

  /**
   * Generate comprehensive optimization report
   */
  public async generateOptimizationReport(): Promise<CostOptimization> {
    const tokenStats = this.calculateTokenUsageStats();
    const timeStats = this.calculateTimeEfficiencyStats();
    const resourceStats = this.calculateResourceUtilizationStats();
    const recommendations = this.generateRecommendations();

    return {
      tokenUsage: tokenStats,
      timeEfficiency: timeStats,
      resourceUtilization: resourceStats,
      recommendations
    };
  }

  /**
   * Get monthly token savings
   */
  public getMonthlyTokenSavings(): { [month: string]: number } {
    const savings: { [month: string]: number } = {};
    
    this.monthlyStats.forEach((stats, month) => {
      savings[month] = stats.costSaved;
    });
    
    return savings;
  }

  /**
   * Get time efficiency gains
   */
  public getTimeEfficiencyGains(): { [operation: string]: number } {
    const efficiencyGains: { [operation: string]: number } = {};
    
    // Group by operation type
    const operationGroups = this.groupEntriesByOperation();
    
    Object.entries(operationGroups).forEach(([operation, entries]) => {
      const avgTimeSpent = entries.reduce((sum, e) => sum + e.timeSpent, 0) / entries.length;
      const baselineTime = this.getBaselineTime(operation);
      const efficiencyGain = ((baselineTime - avgTimeSpent) / baselineTime) * 100;
      
      efficiencyGains[operation] = Math.max(0, efficiencyGain);
    });
    
    return efficiencyGains;
  }

  /**
   * Get resource optimization metrics
   */
  public getResourceOptimization(): any {
    const recentEntries = this.getRecentEntries(30); // Last 30 days
    
    // Calculate agent utilization
    const agentUsage = new Map<string, number>();
    recentEntries.forEach(entry => {
      entry.agentsUsed.forEach(agent => {
        agentUsage.set(agent, (agentUsage.get(agent) || 0) + 1);
      });
    });
    
    // Calculate parallelization effectiveness
    const parallelOperations = recentEntries.filter(e => e.agentsUsed.length > 1).length;
    const parallelizationRate = (parallelOperations / recentEntries.length) * 100;
    
    return {
      agentUtilization: Object.fromEntries(agentUsage),
      parallelizationRate,
      averageAgentsPerTask: this.calculateAverageAgentsPerTask(recentEntries),
      resourceEfficiency: this.calculateResourceEfficiency(recentEntries)
    };
  }

  /**
   * Get projected annual savings
   */
  public getProjectedAnnualSavings(): number {
    const recentMonthlyAverage = this.calculateRecentMonthlyAverage();
    return recentMonthlyAverage * 12;
  }

  /**
   * Get current optimization statistics
   */
  public getCurrentStats(): any {
    const totalEntries = this.costHistory.length;
    const totalSavings = this.costHistory.reduce((sum, entry) => sum + entry.costSaved, 0);
    const avgTokenReduction = this.calculateAverageTokenReduction();
    
    return {
      totalOperations: totalEntries,
      totalSavings: Math.round(totalSavings * 100) / 100,
      averageTokenReduction: Math.round(avgTokenReduction * 100) / 100,
      lastOptimization: totalEntries > 0 ? this.costHistory[totalEntries - 1].timestamp : null
    };
  }

  // Private helper methods
  private calculateTokenUsageStats(): TokenUsageStats {
    const totalOriginal = this.costHistory.reduce((sum, entry) => sum + entry.tokenUsage, 0);
    const totalOptimized = this.costHistory.reduce((sum, entry) => sum + entry.optimizedTokens, 0);
    const reduction = totalOriginal > 0 ? ((totalOriginal - totalOptimized) / totalOriginal) * 100 : 0;
    const costSavings = this.calculateTokenCostSaved(totalOriginal, totalOptimized);
    
    return {
      totalTokens: totalOriginal,
      optimizedTokens: totalOptimized,
      reductionPercentage: Math.round(reduction * 100) / 100,
      costSavings: Math.round(costSavings * 100) / 100
    };
  }

  private calculateTimeEfficiencyStats(): TimeEfficiencyStats {
    const totalTime = this.costHistory.reduce((sum, entry) => sum + entry.timeSpent, 0);
    const automatedTime = this.estimateAutomatedTime();
    const manualTime = totalTime - automatedTime;
    const efficiency = totalTime > 0 ? (automatedTime / totalTime) * 100 : 0;
    
    return {
      totalTime: Math.round(totalTime / 1000 / 3600), // Convert to hours
      automatedTime: Math.round(automatedTime / 1000 / 3600),
      manualTime: Math.round(manualTime / 1000 / 3600),
      efficiencyGain: Math.round(efficiency * 100) / 100
    };
  }

  private calculateResourceUtilizationStats(): ResourceUtilizationStats {
    const agentUtilization: { [agentId: string]: number } = {};
    const recentEntries = this.getRecentEntries(30);
    
    // Calculate agent usage
    recentEntries.forEach(entry => {
      entry.agentsUsed.forEach(agent => {
        agentUtilization[agent] = (agentUtilization[agent] || 0) + 1;
      });
    });
    
    // Normalize to percentages
    const maxUsage = Math.max(...Object.values(agentUtilization));
    if (maxUsage > 0) {
      Object.keys(agentUtilization).forEach(agent => {
        agentUtilization[agent] = (agentUtilization[agent] / maxUsage) * 100;
      });
    }
    
    const parallelOperations = recentEntries.filter(e => e.agentsUsed.length > 1).length;
    const parallelization = recentEntries.length > 0 ? (parallelOperations / recentEntries.length) * 100 : 0;
    
    return {
      agentUtilization,
      systemResources: { cpu: 75, memory: 60, storage: 40 }, // Simulated values
      parallelization: Math.round(parallelization * 100) / 100
    };
  }

  private generateRecommendations(): CostRecommendation[] {
    const recommendations: CostRecommendation[] = [];
    
    // Analyze token usage patterns
    const avgTokenReduction = this.calculateAverageTokenReduction();
    if (avgTokenReduction < 60) {
      recommendations.push({
        type: 'token-optimization',
        description: 'Increase token optimization aggressiveness to achieve higher reduction rates',
        impact: 'high',
        effort: 'low',
        estimatedSavings: 150
      });
    }
    
    // Analyze agent utilization
    const resourceStats = this.getResourceOptimization();
    if (resourceStats.parallelizationRate < 40) {
      recommendations.push({
        type: 'resource-allocation',
        description: 'Increase parallel agent execution to improve efficiency',
        impact: 'medium',
        effort: 'medium',
        estimatedSavings: 200
      });
    }
    
    // Analyze time efficiency
    const recentSavings = this.calculateRecentSavings(7); // Last 7 days
    if (recentSavings < 50) {
      recommendations.push({
        type: 'process-improvement',
        description: 'Optimize workflow processes to reduce manual intervention',
        impact: 'high',
        effort: 'high',
        estimatedSavings: 300
      });
    }
    
    return recommendations;
  }

  private calculateTokenCostSaved(original: number, optimized: number): number {
    const tokensSaved = original - optimized;
    return (tokensSaved / 1000) * this.tokenCostPerThousand;
  }

  private calculateTimeSaved(duration: number, phase: string): number {
    const baselineTime = this.getBaselineTime(`bmad-${phase}`);
    return Math.max(0, (baselineTime - duration) / 1000 / 3600); // Convert to hours
  }

  private getPhaseAgents(phase: 'planning' | 'development'): string[] {
    if (phase === 'planning') {
      return ['analyst', 'product-manager', 'architect'];
    } else {
      return ['scrum-master', 'developer', 'tester'];
    }
  }

  private updateMonthlyStats(entry: CostTrackingEntry): void {
    const month = this.getMonthKey(entry.timestamp);
    
    if (!this.monthlyStats.has(month)) {
      this.monthlyStats.set(month, {
        month,
        totalTokens: 0,
        optimizedTokens: 0,
        costSaved: 0,
        timeEfficiency: 0,
        operationCount: 0
      });
    }
    
    const stats = this.monthlyStats.get(month)!;
    stats.totalTokens += entry.tokenUsage;
    stats.optimizedTokens += entry.optimizedTokens;
    stats.costSaved += entry.costSaved;
    stats.operationCount += 1;
    stats.timeEfficiency = stats.totalTokens > 0 ? ((stats.totalTokens - stats.optimizedTokens) / stats.totalTokens) * 100 : 0;
  }

  private initializeMonthlyStats(): void {
    // Initialize current month if no data exists
    const currentMonth = this.getMonthKey(new Date());
    if (!this.monthlyStats.has(currentMonth)) {
      this.monthlyStats.set(currentMonth, {
        month: currentMonth,
        totalTokens: 0,
        optimizedTokens: 0,
        costSaved: 0,
        timeEfficiency: 0,
        operationCount: 0
      });
    }
  }

  private getMonthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  private groupEntriesByOperation(): { [operation: string]: CostTrackingEntry[] } {
    const groups: { [operation: string]: CostTrackingEntry[] } = {};
    
    this.costHistory.forEach(entry => {
      if (!groups[entry.operation]) {
        groups[entry.operation] = [];
      }
      groups[entry.operation].push(entry);
    });
    
    return groups;
  }

  private getBaselineTime(operation: string): number {
    // Baseline times in milliseconds (manual process estimates)
    const baselines: { [key: string]: number } = {
      'bmad-planning': 4 * 60 * 60 * 1000,   // 4 hours
      'bmad-development': 8 * 60 * 60 * 1000, // 8 hours
      'superclaude-review': 2 * 60 * 60 * 1000, // 2 hours
      'superclaude-build': 1 * 60 * 60 * 1000   // 1 hour
    };
    
    return baselines[operation] || 2 * 60 * 60 * 1000; // Default 2 hours
  }

  private getRecentEntries(days: number): CostTrackingEntry[] {
    const cutoffDate = new Date(Date.now() - (days * 24 * 60 * 60 * 1000));
    return this.costHistory.filter(entry => entry.timestamp >= cutoffDate);
  }

  private estimateAutomatedTime(): number {
    // Estimate time that was automated vs manual
    return this.costHistory.reduce((sum, entry) => {
      // Assume operations with multiple agents are more automated
      const automationFactor = Math.min(entry.agentsUsed.length / 3, 1);
      return sum + (entry.timeSpent * automationFactor);
    }, 0);
  }

  private calculateAverageAgentsPerTask(entries: CostTrackingEntry[]): number {
    if (entries.length === 0) return 0;
    
    const totalAgents = entries.reduce((sum, entry) => sum + entry.agentsUsed.length, 0);
    return Math.round((totalAgents / entries.length) * 100) / 100;
  }

  private calculateResourceEfficiency(entries: CostTrackingEntry[]): number {
    if (entries.length === 0) return 0;
    
    // Calculate efficiency based on cost saved vs time spent
    const totalSavings = entries.reduce((sum, entry) => sum + entry.costSaved, 0);
    const totalTime = entries.reduce((sum, entry) => sum + entry.timeSpent, 0);
    
    // Efficiency = savings per hour
    return totalTime > 0 ? (totalSavings / (totalTime / 1000 / 3600)) : 0;
  }

  private calculateRecentMonthlyAverage(): number {
    const recentMonths = Array.from(this.monthlyStats.values()).slice(-3); // Last 3 months
    if (recentMonths.length === 0) return 0;
    
    const totalSavings = recentMonths.reduce((sum, month) => sum + month.costSaved, 0);
    return totalSavings / recentMonths.length;
  }

  private calculateAverageTokenReduction(): number {
    if (this.costHistory.length === 0) return 0;
    
    const totalReduction = this.costHistory.reduce((sum, entry) => {
      const reduction = entry.tokenUsage > 0 ? 
        ((entry.tokenUsage - entry.optimizedTokens) / entry.tokenUsage) * 100 : 0;
      return sum + reduction;
    }, 0);
    
    return totalReduction / this.costHistory.length;
  }

  private calculateRecentSavings(days: number): number {
    const recentEntries = this.getRecentEntries(days);
    return recentEntries.reduce((sum, entry) => sum + entry.costSaved, 0);
  }

  /**
   * Export cost data for analysis
   */
  public exportCostData(): any {
    return {
      costHistory: this.costHistory,
      monthlyStats: Object.fromEntries(this.monthlyStats),
      summary: this.getCurrentStats(),
      exportedAt: new Date().toISOString()
    };
  }

  /**
   * Clear cost history (for testing or reset)
   */
  public clearHistory(): void {
    this.costHistory = [];
    this.monthlyStats.clear();
    this.initializeMonthlyStats();
  }
}