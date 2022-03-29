import { Injectable } from '@nestjs/common';
import { ClauseService } from 'src/clause/clause.service';
import { ParagraphModel } from './paragraph.model';

@Injectable()
export class ParagraphService {
  static getParagraphsFromArticleJSON(article: any) {
    const transformedParagraphArray: ParagraphModel[] = [];
    const paragraphArray = article.hasPart;

    for (let i = 0; i < paragraphArray.length; i++) {
      const currentParagraphClauses = ClauseService.getClausesFromParagraphJson(
        paragraphArray[i],
      );

      const newParagraph: ParagraphModel = {
        name: paragraphArray[i].name,
        legislationIdentifier: paragraphArray[i].legislationIdentifier,
        id: '',
        text: paragraphArray[i].text,
        clauses: currentParagraphClauses,
      };
      transformedParagraphArray.push(newParagraph);
    }
    return transformedParagraphArray;
  }
}