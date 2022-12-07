import { Module } from '@nestjs/common';
import { Day7Service } from './day-7.service';

@Module({
  imports: [],
  providers: [Day7Service],
  exports: [Day7Service],
})
export class Day7Module {}
