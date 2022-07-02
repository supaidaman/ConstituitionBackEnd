import { Injectable } from '@nestjs/common';
import { SubParagraphModel } from './sub-paragraph.model';

@Injectable()
export class SubParagraphService {
  static getSubParagraphsFromClauseJSON(clause: any): SubParagraphModel[] {
    const transformedSubParagraphArray: SubParagraphModel[] = [];
    const subParagraphArray = clause.hasPart;
    if (subParagraphArray == null) return transformedSubParagraphArray;
    //console.log(clause.hasPart);
    //todo change where the static methods are
    for (let i = 0; i < subParagraphArray.length; i++) {
      const newClause: SubParagraphModel = {
        name:
          subParagraphArray[i].name === ''
            ? subParagraphArray[i].text
            : subParagraphArray[i].name,
        legislationIdentifier: subParagraphArray[i].legislationIdentifier,
        id: '',
        text: subParagraphArray[i].workExample[0].text,
        value: 1,
      };
      transformedSubParagraphArray.push(newClause);
    }
    return transformedSubParagraphArray;
  }
}
