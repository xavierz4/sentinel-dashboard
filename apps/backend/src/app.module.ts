import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './modules/security/security.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { StatsModule } from './modules/stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule, 
    SecurityModule,
    StatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
