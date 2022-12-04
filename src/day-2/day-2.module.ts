import { Module } from '@nestjs/common';
import { Day2Service } from './day-2.service';

@Module({
  imports: [],
  providers: [Day2Service],
  exports: [Day2Service],
})
export class Day2Module {}
