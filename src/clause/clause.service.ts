import { Injectable } from '@nestjs/common';
import { SubParagraphService } from 'src/sub-paragraph/sub-paragraph.service';
import { ClauseModel } from './clause.model';

@Injectable()
export class ClauseService {
  static getClausesFromParagraphJson(paragraph: any) {
    const transformedClauseArray: ClauseModel[] = [];
    const clauseArray = paragraph.hasPart;
    if (clauseArray == null) return transformedClauseArray;

    for (let i = 0; i < clauseArray.length; i++) {
      const currentSubParagraphs =
        SubParagraphService.getSubParagraphsFromClauseJSON(clauseArray[i]);
      let clauseName = '';
      if (clauseArray[i].name === undefined) {
        if (clauseArray[i].workExample[0].text === undefined) {
          clauseName = 'CLAUSULA';
        } else {
          clauseName = clauseArray[i].workExample[0].text;
        }
      } else {
        clauseName = clauseArray[i].name;
      }
      const newClause: ClauseModel = {
        name: clauseName,
        legislationIdentifier: clauseArray[i].legislationIdentifier,
        id: '',
        text: clauseArray[i].workExample[0].text,
        value: currentSubParagraphs.length + 1,
        subparagraphs: currentSubParagraphs,
      };
      transformedClauseArray.push(newClause);
    }
    return transformedClauseArray;
  }
}
