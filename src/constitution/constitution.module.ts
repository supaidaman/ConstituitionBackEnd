import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConstitutionController } from './constitution.controller';
import { ConstitutionService } from './constitution.service';

@Module({
  imports: [HttpModule],
  providers: [ConstitutionService],
  controllers: [ConstitutionController],
})
export class ConstitutionModule {}
