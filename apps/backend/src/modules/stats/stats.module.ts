import { Module } from '@nestjs/common';
import { OpenClawLogService } from './openclaw-log.service';
import { StatsController } from './stats.controller';

@Module({
  providers: [OpenClawLogService],
  controllers: [StatsController],
  exports: [OpenClawLogService]
})
export class StatsModule {}
