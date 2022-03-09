import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstitutionService {
  getFullConstitution(): string {
    return 'for now this is a test';
  }
}
