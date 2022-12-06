import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { Day1Module } from './day-1/day-1.module';
import { Day1Service } from './day-1/day-1.service';
import { Day2Module } from './day-2/day-2.module';
import { Day2Service } from './day-2/day-2.service';
import { Day3Module } from './day-3/day-3.module';
import { Day3Service } from './day-3/day-3.service';
import { Day4Module } from './day-4/day-4.module';
import { Day4Service } from './day-4/day-4.service';
import { Day5Module } from './day-5/day-5.module';
import { Day5Service } from './day-5/day-5.service';

@Module({
  imports: [
    DailyChallengeModule,
    Day1Module,
    Day2Module,
    Day3Module,
    Day4Module,
    Day5Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'DailyServices',
      useFactory: (...params) => params,
      inject: [Day1Service, Day2Service, Day3Service, Day4Service, Day5Service],
    },
    AppService,
  ],
})
export class AppModule {}
