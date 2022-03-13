import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ConstitutionModel } from 'src/constitution.model';

@Injectable()
export class ConstitutionService {
  getFullConstitution(): string {
    return 'for now this is a test';
  }

  //TODO processamento aqui
  processDataFromNormasAPI(normasJson: Observable<any>) {
    
     normasJson.pipe(
       map(response => {
        
         const constModel: ConstitutionModel = {
           legislationDate: response.data['legislationDate'],
           id: response.data['@id'],
         };
         return constModel;
       })
    ).subscribe((res) => {
      console.log(res);
    });

   // console.log(constModel);
    //console.log(jsonInfo);
  }
}
