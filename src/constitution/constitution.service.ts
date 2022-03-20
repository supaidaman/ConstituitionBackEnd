import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ConstitutionModel } from 'src/constitution.model';
import { TitleModel } from '../title/title.model';
@Injectable()
export class ConstitutionService {
  async getFullConstitution(): Promise<string> {
    return 'for now this is a test';
  }

  buildConstituitionModel(response): ConstitutionModel {
    //console.log(response.data);
    const legislationDate = response.data['legislationDate'];
    const id = response.data['@id'];
    const processedTitles: TitleModel[] = [];
    const titlesArray = response.data['hasPart']; //.filter(function (el) {
    //   return el['legislationType'] === 'Título';
    // });
    console.log(titlesArray.length);

    for (let i = 0; i < titlesArray.length; i++) {
      const newTitle: TitleModel = {
        name: titlesArray[i].name,
        id: titlesArray[i]['@id'],
        text: titlesArray[i].text,
        legislationIdentifier: titlesArray[0].legislationIdentifier,
      };
      processedTitles.push(newTitle);
    }
    return new ConstitutionModel(legislationDate, id, processedTitles);
  }
  //TODO processamento aqui
  processDataFromNormasAPI(normasJson: Observable<any>) {
    return normasJson.pipe(
      map((response) => {
        //console.log(response.data);
        const constModel: ConstitutionModel =
          this.buildConstituitionModel(response);
        return constModel;
      }),
    );
  }
}
