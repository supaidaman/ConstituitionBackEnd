import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/article/article.model';
import { MendService } from 'src/mend/mend.service';
import { ParagraphService } from 'src/paragraph/paragraph.service';

@Injectable()
export class ChapterService {
  static getArticlesFromFirstChapterJSON(title: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = title.hasPart;
    //todo change where the static methods are
    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);

      const foreseenChanges = MendService.getForeseenChangesFromArticleJson(
        articleArray[i],
      );
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
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
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
        paragraphs: currentArticleParagraphs,
        foreseenChanges: [],
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }
}
