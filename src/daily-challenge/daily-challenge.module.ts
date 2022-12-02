import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { DailyChallengeService } from './daily-challenge.service';

@Global()
@Module({
  imports: [
    HttpModule.register({
      responseType: 'text',
    }),
  ],
  providers: [DailyChallengeService],
  exports: [DailyChallengeService],
})
export class DailyChallengeModule {}
