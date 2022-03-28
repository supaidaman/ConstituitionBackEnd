import { Injectable } from '@nestjs/common';
import { ParagraphModel } from './paragraph.model';

@Injectable()
export class ParagraphService {
  static getParagraphsFromArticleJSON(article: any) {
    const transformedParagraphArray: ParagraphModel[] = [];
    const paragraphArray = article.hasPart;
    console.log('paragrafos');
    console.log(paragraphArray[0].text);

    for (let i = 0; i < paragraphArray.length; i++) {
      const newParagraph: ParagraphModel = {
        name: paragraphArray[i].name,
        legislationIdentifier: paragraphArray[i].legislationIdentifier,
        id: '',
        text: paragraphArray[i].text,
        isInciso: false,
      };
      transformedParagraphArray.push(newParagraph);
    }
    return transformedParagraphArray;
  }
}
