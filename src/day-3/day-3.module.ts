import { Module } from '@nestjs/common';
import { Day3Service } from './day-3.service';

@Module({
  imports: [],
  providers: [Day3Service],
  exports: [Day3Service],
})
export class Day3Module {}
