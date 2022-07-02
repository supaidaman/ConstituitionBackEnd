import { Injectable } from '@nestjs/common';
import { MendService } from 'src/mend/mend.service';
import { ParagraphService } from 'src/paragraph/paragraph.service';
import { ArticleModel } from './article.model';

@Injectable()
export class ArticleService {
  static getArticlesFromNoTitleChapterJSON(title: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = title.hasPart;

    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);

      const foreseenChanges = MendService.getForeseenChangesFromArticleJson(
        articleArray[i],
      );
      let sum = 1;
      currentArticleParagraphs.forEach((a) => (sum += a.value));
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
        value: sum,
        paragraphs: currentArticleParagraphs,
        foreseenChanges: foreseenChanges,
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }

  static getArticlesFromChapterJSON(chapter: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = chapter.hasPart;

    if (chapter.text === 'Dos Direitos e Deveres Individuais e Coletivos') {
      console.log(chapter.hasPart);
    }
    //todo change where the static methods are
    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);

      let sum = 1;
      currentArticleParagraphs.forEach((a) => (sum += a.value));
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
        value: sum,
        paragraphs: currentArticleParagraphs,
        foreseenChanges: [],
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }
}
