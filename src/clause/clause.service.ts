import { Injectable } from '@nestjs/common';
import { SubParagraphService } from 'src/sub-paragraph/sub-paragraph.service';
import { ClauseModel } from './clause.model';

@Injectable()
export class ClauseService {
  static getClausesFromParagraphJson(paragraph: any) {
    const transformedClauseArray: ClauseModel[] = [];
    const clauseArray = paragraph.hasPart;
    if (clauseArray == null) return transformedClauseArray;

    //todo change where the static methods are
    for (let i = 0; i < clauseArray.length; i++) {
      const currentSubParagraphs =
        SubParagraphService.getSubParagraphsFromClauseJSON(clauseArray[i]);
      if (
        clauseArray[i].workExample[0].text ===
        'são assegurados, nos termos da lei:'
      ) {
        console.log('achou');
        console.log(currentSubParagraphs);
      }
      const newClause: ClauseModel = {
        name: clauseArray[i].name,
        legislationIdentifier: clauseArray[i].legislationIdentifier,
        id: '',
        text: clauseArray[i].workExample[0].text,
        subparagraphs: currentSubParagraphs,
      };
      transformedClauseArray.push(newClause);
    }
    return transformedClauseArray;
  }
}
