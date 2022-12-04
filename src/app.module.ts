import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { Day1Module } from './day-1/day-1.module';
import { Day2Module } from './day-2/day-2.module';

@Module({
  imports: [DailyChallengeModule, Day1Module, Day2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
