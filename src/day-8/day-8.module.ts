import { Module } from '@nestjs/common';
import { Day8Service } from './day-8.service';

@Module({
  imports: [],
  providers: [Day8Service],
  exports: [Day8Service],
})
export class Day8Module {}
