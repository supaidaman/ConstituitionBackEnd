import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ConstitutionModel } from 'src/constitution.model';

@Injectable()
export class ConstitutionService {
  async getFullConstitution(): Promise<string> {
    return 'for now this is a test';
  }

  //TODO processamento aqui
  async processDataFromNormasAPI(normasJson: Observable<any>) {
    normasJson
      .pipe(
        map((response) => {
          console.log(response.data);
          const constModel: ConstitutionModel = {
            legislationDate: response.data['legislationDate'],
            id: response.data['@id'],
          };
          return constModel;
        }),
      )
      .subscribe((res) => {
        console.log(res);
      });

    // console.log(constModel);
    //console.log(jsonInfo);
  }
}
