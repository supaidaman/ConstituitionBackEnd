import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/article/article.model';
import { ParagraphService } from 'src/paragraph/paragraph.service';

@Injectable()
export class ChapterService {
  static getArticlesFromChapterJSON(chapter: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = chapter.hasPart;
    console.log('artigo');
    console.log(articleArray);
    //todo change where the static methods are
    for (let i = 0; i < articleArray.length; i++) {
      const currentArticleParagraphs =
        ParagraphService.getParagraphsFromArticleJSON(articleArray[i]);
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
        paragraphs: currentArticleParagraphs,
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }
}
