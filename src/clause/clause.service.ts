import { Injectable } from '@nestjs/common';
import { MendService } from 'src/mend/mend.service';
import { SubParagraphService } from 'src/sub-paragraph/sub-paragraph.service';
import { v4 as uuidv4 } from 'uuid';
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
      const foreseenChanges = MendService.getForeseenChangesFromArticleJson(
        clauseArray[i],
      );
      const newClause: ClauseModel = {
        name: clauseName,
        legislationIdentifier: clauseArray[i].legislationIdentifier,
        id: uuidv4(),
        text: clauseArray[i].workExample[0].text,

        legislationType: clauseArray[i].legislationType,
        value: currentSubParagraphs.length + 1,
        subparagraphs: currentSubParagraphs,
        foreseenChanges: foreseenChanges,
      };
      transformedClauseArray.push(newClause);
    }
    return transformedClauseArray;
  }
}
