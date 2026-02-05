import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface LogEntry {
  role: string;
  content: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  timestamp: string;
}

export interface SessionStats {
  sessionId: string;
  totalTokens: number;
  estimatedCost: number;
  messageCount: number;
  lastActive: string;
}

@Injectable()
export class OpenClawLogService {
  private readonly logsPath = '/home/xavierz4/.openclaw/agents/main/sessions/';
  
  // Precios 2026 (Estimados en USD por 1M de tokens)
  private readonly pricing = {
    'google/gemini-3-flash-preview': { input: 0.075, output: 0.30 }, // Promedio 0.15
    'google/gemini-3-pro': { input: 1.25, output: 5.00 },
    'default': { input: 0.15, output: 0.60 }
  };

  async getSessionsStats(): Promise<SessionStats[]> {
    const files = fs.readdirSync(this.logsPath).filter(f => f.endsWith('.jsonl'));
    const stats: SessionStats[] = [];

    for (const file of files) {
      const filePath = path.join(this.logsPath, file);
      const sessionStats = await this.parseLogFile(filePath, file.replace('.jsonl', ''));
      if (sessionStats) stats.push(sessionStats);
    }

    return stats.sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime());
  }

  private async parseLogFile(filePath: string, sessionId: string): Promise<SessionStats | null> {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').filter(l => l.trim());
      
      let totalTokens = 0;
      let estimatedCost = 0;
      let messageCount = 0;
      let lastActive = '';

      for (const line of lines) {
        const entry = JSON.parse(line);
        messageCount++;
        
        if (entry.timestamp) lastActive = entry.timestamp;

        // Lógica de conteo de tokens (simplificada para el MVP si no viene en el log)
        // En OpenClaw real, buscamos entry.usage
        if (entry.usage) {
          const model = entry.model || 'default';
          const rates = this.pricing[model] || this.pricing['default'];
          
          totalTokens += entry.usage.total_tokens;
          estimatedCost += (entry.usage.prompt_tokens / 1_000_000) * rates.input;
          estimatedCost += (entry.usage.completion_tokens / 1_000_000) * rates.output;
        } else if (entry.content) {
          // Fallback: estimación por longitud si el log no tiene metadatos de tokens
          const estTokens = Math.ceil(entry.content.length / 4);
          totalTokens += estTokens;
          const rates = this.pricing['default'];
          estimatedCost += (estTokens / 1_000_000) * rates.input;
        }
      }

      return {
        sessionId,
        totalTokens,
        estimatedCost: parseFloat(estimatedCost.toFixed(4)),
        messageCount,
        lastActive
      };
    } catch (e) {
      return null;
    }
  }
}
