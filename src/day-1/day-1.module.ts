import { Module } from '@nestjs/common';
import { Day1Service } from './day-1.service';

@Module({
  imports: [],
  providers: [Day1Service],
  exports: [Day1Service],
})
export class Day1Module {}
