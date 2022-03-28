import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/article/article.model';

@Injectable()
export class ChapterService {
  static getArticlesFromChapter(chapter: any) {
    const transformedArticleArray: ArticleModel[] = [];
    const articleArray = chapter.hasPart;
    console.log('artigo');
    console.log(articleArray);

    for (let i = 0; i < articleArray.length; i++) {
      const newArticle: ArticleModel = {
        name: articleArray[i].name,
        text: articleArray[i].text,
        legislationIdentifier: articleArray[i].legislationIdentifier,
        id: '',
      };
      transformedArticleArray.push(newArticle);
    }
    return transformedArticleArray;
  }
}
