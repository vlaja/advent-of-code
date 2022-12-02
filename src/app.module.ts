import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { Day1Module } from './day-1/day-1.module';

@Module({
  imports: [DailyChallengeModule, Day1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
