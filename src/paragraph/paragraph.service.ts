import { Injectable } from '@nestjs/common';
import { ClauseService } from 'src/clause/clause.service';
import { ParagraphModel } from './paragraph.model';
import { titleCase } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { MendService } from 'src/mend/mend.service';

@Injectable()
export class ParagraphService {
  static getParagraphsFromArticleJSON(article: any) {
    const transformedParagraphArray: ParagraphModel[] = [];
    const paragraphArray = article.hasPart;

    for (let i = 0; i < paragraphArray.length; i++) {
      const currentParagraphClauses = ClauseService.getClausesFromParagraphJson(
        paragraphArray[i],
      );

      let sum = 1;
      let paragraphName = '';
      if (article.name == 'Seção I') {
        console.log(paragraphArray[i].name);
        console.log(paragraphArray[i].workExample[0].text);
      }
      if (paragraphArray[i].name === undefined) {
        if (paragraphArray[i].workExample[0].text === undefined) {
          paragraphName = 'PARAGRAFO';
          console.log(paragraphArray[i]);
        } else {
          paragraphName = paragraphArray[i].workExample[0].text;
        }
      } else {
        paragraphName = paragraphArray[i].name;
      }
      currentParagraphClauses.forEach((a) => (sum += a.value));

      const foreseenChanges = MendService.getForeseenChangesFromArticleJson(
        paragraphArray[i],
      );
      const newParagraph: ParagraphModel = {
        name: titleCase(paragraphName),
        legislationIdentifier: paragraphArray[i].legislationIdentifier,
        id: uuidv4(),
        text: paragraphArray[i].workExample[0].text,
        legislationType: paragraphArray[i].legislationType,
        value: sum,
        clauses: currentParagraphClauses,
        foreseenChanges: foreseenChanges,
      };
      transformedParagraphArray.push(newParagraph);
    }
    return transformedParagraphArray;
  }
}
