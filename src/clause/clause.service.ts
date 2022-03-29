import { Injectable } from '@nestjs/common';
import { ClauseModel } from './clause.model';

@Injectable()
export class ClauseService {
  static getClausesFromParagraphJson(paragraph: any) {
    const transformedClauseArray: ClauseModel[] = [];
    const clauseArray = paragraph.hasPart;
    if (clauseArray == null) return transformedClauseArray;

    //todo change where the static methods are
    for (let i = 0; i < clauseArray.length; i++) {
      const newClause: ClauseModel = {
        name: clauseArray[i].name,
        legislationIdentifier: clauseArray[i].legislationIdentifier,
        id: '',
        text: clauseArray[i].text,
      };
      transformedClauseArray.push(newClause);
    }
    return transformedClauseArray;
  }
}
