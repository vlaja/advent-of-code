import { Module } from '@nestjs/common';
import { Day6Service } from './day-6.service';

@Module({
  imports: [],
  providers: [Day6Service],
  exports: [Day6Service],
})
export class Day6Module {}
