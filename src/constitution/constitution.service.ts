import { Injectable } from '@nestjs/common';
import { lastValueFrom, map, Observable } from 'rxjs';
import { ChapterModel } from 'src/chapter/chapter.model';
import { ChapterService } from 'src/chapter/chapter.service';
import { ConstitutionModel } from 'src/constitution/constitution.model';
import { MendService } from 'src/mend/mend.service';
import { TitleService } from 'src/title/title.service';
import { TitleModel } from '../title/title.model';
import { titleCase } from '../utils/utils';
@Injectable()
export class ConstitutionService {
  async getFullConstitution(): Promise<string> {
    return 'for now this is a test';
  }

  buildConstituitionModel(response): ConstitutionModel {
    const legislationDate = response.data['legislationDate'];
    const id = response.data['@id'];
    const processedTitles: TitleModel[] = [];
    //----------------------------------------
    let titlesArray = response.data.hasPart;
    titlesArray = titlesArray[0].hasPart[2];
    titlesArray = titlesArray.hasPart;

    for (let i = 0; i < titlesArray.length; i++) {
      let currentTitleArticles: ChapterModel[] = [];

      currentTitleArticles = ChapterService.getChaptersFromTitleJSON(
        titlesArray[i],
      );

      let sum = 1;
      currentTitleArticles.forEach((a) => (sum += a.value));

      const foreseenChanges = MendService.getForeseenChangesFromArticleJson(
        titlesArray[i],
      );

      const newTitle: TitleModel = {
        name: titleCase(
          titlesArray[i].name === '' || titlesArray[i].name === undefined
            ? titlesArray[i].text
            : titlesArray[i].name,
        ),
        id: titlesArray[i]['@id'],
        text: titlesArray[i].workExample[0].text,
        legislationIdentifier: titlesArray[i].legislationIdentifier,
        legislationType: titlesArray[i].legislationType,
        value: sum,
        chapters: currentTitleArticles,
        foreseenChanges,
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
