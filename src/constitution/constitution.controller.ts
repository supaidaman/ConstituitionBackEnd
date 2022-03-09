import { Controller, Get } from '@nestjs/common';
import { ConstitutionService } from './constitution.service';

@Controller('constitution')
export class ConstitutionController {
  constructor(private constitutionService: ConstitutionService) {}

  @Get()
  getFullConstitution(): string {
    return this.constitutionService.getFullConstitution();
  }
}
