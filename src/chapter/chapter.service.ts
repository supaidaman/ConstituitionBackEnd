import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { MendService } from 'src/mend/mend.service';
import { ParagraphService } from 'src/paragraph/paragraph.service';
import { ChapterModel } from './chapter.model';

@Injectable()
export class ChapterService {
  static getChaptersFromTitleJSON(title: any): ChapterModel[] {
    const transformedChapterArray: ChapterModel[] = [];
    const chapterArray = title.hasPart;

    if (title.name !== 'TÍTULO I' && title.name !== 'TÍTULO IX') {
      for (let i = 0; i < chapterArray.length; i++) {
        if (chapterArray[i].legislationType !== 'Artigo') {
          const currentChapterArticles =
            ArticleService.getArticlesFromChapterJSON(chapterArray[i]);

          let sum = 1;
          currentChapterArticles.forEach((a) => (sum += a.value));
          const newChapter: ChapterModel = {
            name: chapterArray[i].name,
            id: chapterArray[i]['@id'],
            text: chapterArray[i].hasPart[0].hasPart[0].workExample[0].text,
            value: sum,
            legislationIdentifier: chapterArray[i].legislationIdentifier,
            children: currentChapterArticles,
          };
          transformedChapterArray.push(newChapter);
        }
      }
    } else {
      const currentChapterArticles =
        ArticleService.getArticlesFromNoTitleChapterJSON(title);
      let sum = 1;
      currentChapterArticles.forEach((a) => (sum += a.value));
      const newChapter: ChapterModel = {
        name: '',
        id: '',
        text: 'CAPÍTULO ÚNICO',
        legislationIdentifier: '',
        value: sum,
        children: currentChapterArticles,
      };
      transformedChapterArray.push(newChapter);
    }
    return transformedChapterArray;
  }
}
