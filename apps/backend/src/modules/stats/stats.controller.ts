import { Controller, Get } from '@nestjs/common';
import { OpenClawLogService, SessionStats } from './openclaw-log.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly logService: OpenClawLogService) {}

  @Get('sessions')
  async getStats(): Promise<SessionStats[]> {
    return this.logService.getSessionsStats();
  }

  @Get('summary')
  async getSummary() {
    const stats = await this.logService.getSessionsStats();
    const totalCost = stats.reduce((acc, s) => acc + s.estimatedCost, 0);
    const totalTokens = stats.reduce((acc, s) => acc + s.totalTokens, 0);
    const activeSessions = stats.length;

    return {
      totalCost: parseFloat(totalCost.toFixed(2)),
      totalTokens,
      activeSessions,
      currency: 'USD',
      updatedAt: new Date().toISOString()
    };
  }
}
