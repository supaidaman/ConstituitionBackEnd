import { Injectable } from '@nestjs/common';
import { ChangeType } from 'src/mend/mend.model';
import { MendService } from 'src/mend/mend.service';
import { v4 as uuidv4 } from 'uuid';
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
      const foreseenChanges = MendService.getChangesFromArticleJson(
        subParagraphArray[i],
        ChangeType.FORESEEN,
      );
      const alreadyAppliedChanges = MendService.getChangesFromArticleJson(
        subParagraphArray[i],
        ChangeType.PASSED,
      );
      const newClause: SubParagraphModel = {
        name:
          subParagraphArray[i].name === ''
            ? subParagraphArray[i].text
            : subParagraphArray[i].name,
        legislationIdentifier: subParagraphArray[i].legislationIdentifier,
        id: uuidv4(),
        text: subParagraphArray[i].workExample[0].text,
        legislationType: subParagraphArray[i].legislationType,
        value: 1,
        foreseenChanges: foreseenChanges,
        alreadyAppliedChanges: alreadyAppliedChanges,
      };
      transformedSubParagraphArray.push(newClause);
    }
    return transformedSubParagraphArray;
  }
}
