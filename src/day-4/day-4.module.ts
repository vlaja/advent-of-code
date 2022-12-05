import { Module } from '@nestjs/common';
import { Day4Service } from './day-4.service';

@Module({
  imports: [],
  providers: [Day4Service],
  exports: [Day4Service],
})
export class Day4Module {}
