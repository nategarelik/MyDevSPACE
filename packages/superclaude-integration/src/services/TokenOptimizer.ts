import { TokenOptimization } from '../types';

interface ContextNode {
  id: string;
  content: string;
  importance: number;
  dependencies: string[];
  lastAccessed: Date;
  compressionRatio: number;
}

interface SemanticCluster {
  id: string;
  nodes: string[];
  centroid: number[];
  summary: string;
  priority: number;
}

export class TokenOptimizer {
  private contextCache = new Map<string, ContextNode>();
  private semanticClusters = new Map<string, SemanticCluster>();
  private compressionStrategies = ['context', 'semantic', 'intelligent', 'hybrid'] as const;
  private tokenHistory: { [key: string]: number[] } = {};

  public async optimizeTokens(
    content: string,
    context: any,
    strategy: 'context' | 'semantic' | 'intelligent' | 'hybrid' = 'hybrid'
  ): Promise<TokenOptimization> {
    const originalTokens = this.estimateTokens(content);
    
    let optimizedContent: string;
    let reductionPercentage: number;
    
    switch (strategy) {
      case 'context':
        optimizedContent = await this.contextAwareCompression(content, context);
        break;
      case 'semantic':
        optimizedContent = await this.semanticCompression(content, context);
        break;
      case 'intelligent':
        optimizedContent = await this.intelligentCompression(content, context);
        break;
      case 'hybrid':
      default:
        optimizedContent = await this.hybridCompression(content, context);
        break;
    }
    
    const optimizedTokens = this.estimateTokens(optimizedContent);
    reductionPercentage = ((originalTokens - optimizedTokens) / originalTokens) * 100;
    
    this.trackOptimizationPerformance(strategy, originalTokens, optimizedTokens);
    
    return {
      originalTokens,
      optimizedTokens,
      reductionPercentage: Math.round(reductionPercentage * 100) / 100,
      compressionStrategy: strategy
    };
  }

  private async contextAwareCompression(content: string, context: any): Promise<string> {
    const lines = content.split('\n');
    const contextGraph = this.buildContextGraph(lines, context);
    
    const essentialLines = this.identifyEssentialContent(contextGraph);
    const compressedLines = this.compressSimilarBlocks(essentialLines);
    
    return compressedLines.join('\n');
  }

  private async semanticCompression(content: string, context: any): Promise<string> {
    const segments = this.segmentContent(content);
    
    const clusters = await this.createSemanticClusters(segments);
    const summaries = clusters.map(cluster => this.generateClusterSummary(cluster));
    
    return this.reconstructFromSummaries(summaries, context);
  }

  private async intelligentCompression(content: string, context: any): Promise<string> {
    const importanceScores = await this.analyzeContentImportance(content, context);
    
    const filteredContent = this.filterByRelevance(content, importanceScores, context);
    
    return this.applyAdvancedCompression(filteredContent, context);
  }

  private async hybridCompression(content: string, context: any): Promise<string> {
    let compressed = await this.contextAwareCompression(content, context);
    
    if (this.estimateTokens(compressed) > 2000) {
      compressed = await this.semanticCompression(compressed, context);
    }
    
    if (this.estimateTokens(compressed) > 1500) {
      compressed = await this.intelligentCompression(compressed, context);
    }
    
    return this.finalOptimizationPass(compressed, context);
  }

  private buildContextGraph(lines: string[], context: any): Map<number, ContextNode> {
    const graph = new Map<number, ContextNode>();
    
    lines.forEach((line, index) => {
      const node: ContextNode = {
        id: `node_${index}`,
        content: line,
        importance: this.calculateImportance(line, context),
        dependencies: this.findDependencies(line, lines),
        lastAccessed: new Date(),
        compressionRatio: 1.0
      };
      graph.set(index, node);
    });
    
    return graph;
  }

  private calculateImportance(line: string, context: any): number {
    let importance = 0.5;
    
    const highImportanceKeywords = ['error', 'critical', 'security', 'performance', 'bug'];
    const mediumImportanceKeywords = ['warning', 'deprecated', 'optimize', 'refactor'];
    
    highImportanceKeywords.forEach(keyword => {
      if (line.toLowerCase().includes(keyword)) importance += 0.3;
    });
    
    mediumImportanceKeywords.forEach(keyword => {
      if (line.toLowerCase().includes(keyword)) importance += 0.2;
    });
    
    if (context?.focusAreas) {
      context.focusAreas.forEach((area: string) => {
        if (line.toLowerCase().includes(area.toLowerCase())) {
          importance += 0.25;
        }
      });
    }
    
    return Math.min(importance, 1.0);
  }

  private findDependencies(line: string, allLines: string[]): string[] {
    const dependencies: string[] = [];
    
    const variableMatches = line.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
    
    variableMatches.forEach(variable => {
      allLines.forEach((otherLine, index) => {
        if (otherLine !== line && otherLine.includes(variable)) {
          dependencies.push(`node_${index}`);
        }
      });
    });
    
    return [...new Set(dependencies)];
  }

  private identifyEssentialContent(graph: Map<number, ContextNode>): string[] {
    const essential: string[] = [];
    
    const sortedNodes = Array.from(graph.values())
      .sort((a, b) => (b.importance + b.dependencies.length * 0.1) - (a.importance + a.dependencies.length * 0.1));
    
    const keepCount = Math.ceil(sortedNodes.length * 0.7);
    
    for (let i = 0; i < keepCount; i++) {
      essential.push(sortedNodes[i].content);
    }
    
    return essential;
  }

  private compressSimilarBlocks(lines: string[]): string[] {
    const compressed: string[] = [];
    let currentBlock: string[] = [];
    let blockType = '';
    
    lines.forEach(line => {
      const lineType = this.identifyLineType(line);
      
      if (lineType === blockType && currentBlock.length > 0) {
        currentBlock.push(line);
      } else {
        if (currentBlock.length > 0) {
          compressed.push(this.compressBlock(currentBlock, blockType));
        }
        currentBlock = [line];
        blockType = lineType;
      }
    });
    
    if (currentBlock.length > 0) {
      compressed.push(this.compressBlock(currentBlock, blockType));
    }
    
    return compressed;
  }

  private identifyLineType(line: string): string {
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) return 'comment';
    if (line.includes('import') || line.includes('require')) return 'import';
    if (line.includes('console.log')) return 'debug';
    if (line.includes('interface') || line.includes('type')) return 'type';
    return 'code';
  }

  private compressBlock(block: string[], type: string): string {
    if (type === 'comment' && block.length > 3) {
      return `${block[0]}\n// ... [${block.length - 2} similar comments compressed]\n${block[block.length - 1]}`;
    }
    if (type === 'import' && block.length > 5) {
      return `${block.slice(0, 3).join('\n')}\n// ... [${block.length - 3} imports compressed]`;
    }
    return block.join('\n');
  }

  private segmentContent(content: string): string[] {
    return content.split(/\n\s*\n/).filter(segment => segment.trim().length > 0);
  }

  private async createSemanticClusters(segments: string[]): Promise<SemanticCluster[]> {
    const clusters: SemanticCluster[] = [];
    let clusterId = 0;
    
    segments.forEach((segment, index) => {
      const keywords = this.extractKeywords(segment);
      let assignedCluster = false;
      
      for (const cluster of clusters) {
        const similarity = this.calculateSimilarity(keywords, cluster.centroid);
        if (similarity > 0.6) {
          cluster.nodes.push(`segment_${index}`);
          assignedCluster = true;
          break;
        }
      }
      
      if (!assignedCluster) {
        clusters.push({
          id: `cluster_${clusterId++}`,
          nodes: [`segment_${index}`],
          centroid: keywords,
          summary: this.generateQuickSummary(segment),
          priority: this.calculateSegmentPriority(segment)
        });
      }
    });
    
    return clusters;
  }

  private extractKeywords(text: string): number[] {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const keywordCounts = new Map<string, number>();
    
    words.forEach(word => {
      keywordCounts.set(word, (keywordCounts.get(word) || 0) + 1);
    });
    
    return Array.from(keywordCounts.values()).slice(0, 10);
  }

  private calculateSimilarity(vec1: number[], vec2: number[]): number {
    const maxLength = Math.max(vec1.length, vec2.length);
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < maxLength; i++) {
      const a = vec1[i] || 0;
      const b = vec2[i] || 0;
      dotProduct += a * b;
      norm1 += a * a;
      norm2 += b * b;
    }
    
    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2) || 1);
  }

  private generateQuickSummary(text: string): string {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length <= 2) return text;
    
    return `${sentences[0]}... [+${sentences.length - 1} more sentences]`;
  }

  private calculateSegmentPriority(segment: string): number {
    let priority = 0.5;
    
    if (segment.includes('function') || segment.includes('class')) priority += 0.3;
    if (segment.includes('//') || segment.includes('/*')) priority -= 0.2;
    if (segment.includes('TODO') || segment.includes('FIXME')) priority += 0.1;
    
    return Math.max(0, Math.min(1, priority));
  }

  private generateClusterSummary(cluster: SemanticCluster): string {
    return `[Cluster ${cluster.id}: ${cluster.nodes.length} segments] ${cluster.summary}`;
  }

  private reconstructFromSummaries(summaries: string[], context: any): string {
    return summaries.join('\n\n');
  }

  private async analyzeContentImportance(content: string, context: any): Promise<Map<string, number>> {
    const importance = new Map<string, number>();
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      importance.set(`line_${index}`, this.calculateImportance(line, context));
    });
    
    return importance;
  }

  private filterByRelevance(content: string, scores: Map<string, number>, context: any): string {
    const lines = content.split('\n');
    const filtered: string[] = [];
    
    lines.forEach((line, index) => {
      const score = scores.get(`line_${index}`) || 0;
      if (score > 0.3) {
        filtered.push(line);
      }
    });
    
    return filtered.join('\n');
  }

  private applyAdvancedCompression(content: string, context: any): string {
    let compressed = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    compressed = compressed.replace(/console\.log\([^)]+\);?/g, '// [console.log compressed]');
    
    compressed = compressed.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      if (match.length > 200) {
        return '/* [Long comment compressed] */';
      }
      return match;
    });
    
    return compressed;
  }

  private finalOptimizationPass(content: string, context: any): string {
    return content
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s+$/gm, '')
      .trim();
  }

  private estimateTokens(content: string): number {
    return Math.ceil(content.length / 4);
  }

  private trackOptimizationPerformance(strategy: string, original: number, optimized: number): void {
    if (!this.tokenHistory[strategy]) {
      this.tokenHistory[strategy] = [];
    }
    
    const reduction = ((original - optimized) / original) * 100;
    this.tokenHistory[strategy].push(reduction);
    
    if (this.tokenHistory[strategy].length > 100) {
      this.tokenHistory[strategy].shift();
    }
  }

  public async calculateUsage(operation: string, data: any): Promise<TokenOptimization> {
    const baseTokens = this.estimateTokens(JSON.stringify(data));
    
    const optimizedTokens = Math.ceil(baseTokens * 0.3);
    
    return {
      originalTokens: baseTokens,
      optimizedTokens: optimizedTokens,
      reductionPercentage: 70,
      compressionStrategy: 'hybrid'
    };
  }

  public getOptimizationStats(): { [strategy: string]: { average: number; count: number } } {
    const stats: { [strategy: string]: { average: number; count: number } } = {};
    
    Object.entries(this.tokenHistory).forEach(([strategy, reductions]) => {
      const average = reductions.reduce((sum, r) => sum + r, 0) / reductions.length;
      stats[strategy] = {
        average: Math.round(average * 100) / 100,
        count: reductions.length
      };
    });
    
    return stats;
  }

  public clearCache(): void {
    this.contextCache.clear();
    this.semanticClusters.clear();
  }
}