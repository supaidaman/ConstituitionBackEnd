import { Injectable } from '@nestjs/common';
import { ChangeType } from 'src/mend/mend.model';
import { MendService } from 'src/mend/mend.service';
import { ParagraphService } from 'src/paragraph/paragraph.service';
import { v4 as uuidv4 } from 'uuid';
import { ArticleModel } from './article.model';

@Injectable()
export class ArticleService {
  static getArticlesFromNoTitleChapterJSON(title: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = title.hasPart;

    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);

      const foreseenChanges = MendService.getChangesFromArticleJson(
        articleArray[i],
        ChangeType.FORESEEN,
      );

      let articleName = '';
      if (articleArray[i].name === undefined) {
        if (articleArray[i].workExample[0].text === undefined) {
          articleName = 'CLAUSULA';
        } else {
          articleName = articleArray[i].workExample[0].text;
        }
      } else {
        articleName = articleArray[i].name;
      }
      //--------------

      const alreadyAppliedChanges = MendService.getChangesFromArticleJson(
        articleArray[i],
        ChangeType.PASSED,
      );
      let sum = 1;
      currentArticleParagraphs.forEach((a) => (sum += a.value));
      const newArticle: ArticleModel = {
        name: articleName,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: uuidv4(),
        legislationType: articleArray[i].legislationType,
        value: sum,
        paragraphs: currentArticleParagraphs,
        foreseenChanges: foreseenChanges,
        alreadyAppliedChanges: alreadyAppliedChanges,
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }

  static getArticlesFromChapterJSON(chapter: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = chapter.hasPart;

    // if (chapter.text === 'Dos Direitos e Deveres Individuais e Coletivos') {
    //   console.log(chapter.hasPart);
    // }
    //todo change where the static methods are
    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);

      let articleName = '';
      if (articleArray[i].name === undefined) {
        if (articleArray[i].workExample[0].text === undefined) {
          articleName = 'CLAUSULA';
        } else {
          articleName = articleArray[i].workExample[0].text;
        }
      } else {
        articleName = articleArray[i].name;
      }
      //--------------
      //console.log(articleArray[i]);
      if (articleName === 'Art. 5º') {
        console.log('aaa');
      }

      const foreseenChanges = MendService.getChangesFromArticleJson(
        articleArray[i],
        ChangeType.PASSED,
      );
      const alreadyAppliedChanges = MendService.getChangesFromArticleJson(
        articleArray[i],
        ChangeType.FORESEEN,
      );
      let sum = 1;
      currentArticleParagraphs.forEach((a) => (sum += a.value));
      const newArticle: ArticleModel = {
        name: articleName,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: uuidv4(),
        value: sum,
        paragraphs: currentArticleParagraphs,
        legislationType: articleArray[i].legislationType,
        foreseenChanges: foreseenChanges,
        alreadyAppliedChanges: alreadyAppliedChanges,
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }
}
