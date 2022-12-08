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
import { Day6Module } from './day-6/day-6.module';
import { Day6Service } from './day-6/day-6.service';
import { Day7Module } from './day-7/day-7.module';
import { Day7Service } from './day-7/day-7.service';
import { Day8Module } from './day-8/day-8.module';
import { Day8Service } from './day-8/day-8.service';

@Module({
  imports: [
    DailyChallengeModule,
    Day1Module,
    Day2Module,
    Day3Module,
    Day4Module,
    Day5Module,
    Day6Module,
    Day7Module,
    Day8Module,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'DailyServices',
      useFactory: (...params) => params,
      inject: [
        Day1Service,
        Day2Service,
        Day3Service,
        Day4Service,
        Day5Service,
        Day6Service,
        Day7Service,
        Day8Service,
      ],
    },
    AppService,
  ],
})
export class AppModule {}
