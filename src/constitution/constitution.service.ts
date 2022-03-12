import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ConstitutionService {
  getFullConstitution(): string {

    
    return 'for now this is a test';
  }

  //TODO processamento aqui
  processDataFromNormasAPI(normasJson: Observable<any>) {
    console.log(normasJson)
  }
}
