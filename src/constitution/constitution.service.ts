import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ChapterModel } from 'src/chapter/chapter.model';
import { ConstitutionModel } from 'src/constitution/constitution.model';
import { TitleService } from 'src/title/title.service';
import { TitleModel } from '../title/title.model';
@Injectable()
export class ConstitutionService {
  async getFullConstitution(): Promise<string> {
    return 'for now this is a test';
  }

  buildConstituitionModel(response): ConstitutionModel {
    // const titlesArray = response.data.hasPart;
    // console.log(titlesArray[0].hasPart[2]);
    // return response.data;
    const legislationDate = response.data['legislationDate'];
    const id = response.data['@id'];
    const processedTitles: TitleModel[] = [];
    //----------------------------------------
    let titlesArray = response.data.hasPart;
    titlesArray = titlesArray[0].hasPart[2];
    titlesArray = titlesArray.hasPart;
    //----------------------------------------
    //.filter(function (el) {
    //   return el['legislationType'] === 'Título';
    // });

    for (let i = 0; i < titlesArray.length; i++) {
      let currentTitleArticles: ChapterModel[] = [];

      currentTitleArticles = TitleService.getChaptersFromTitleJSON(
        titlesArray[i],
      );

      let sum = 1;
      currentTitleArticles.forEach((a) => (sum += a.value));

      const newTitle: TitleModel = {
        name: titlesArray[i].name,
        id: titlesArray[i]['@id'],
        text: titlesArray[i].workExample[0].text,
        legislationIdentifier: titlesArray[0].legislationIdentifier,
        value: sum,
        children: currentTitleArticles,
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
