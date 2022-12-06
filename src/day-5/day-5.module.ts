import { Module } from '@nestjs/common';
import { Day5Service } from './day-5.service';

@Module({
  imports: [],
  providers: [Day5Service],
  exports: [Day5Service],
})
export class Day5Module {}
