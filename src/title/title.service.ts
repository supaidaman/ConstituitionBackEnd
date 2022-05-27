import { Injectable } from '@nestjs/common';

import { ChapterModel } from 'src/chapter/chapter.model';
import { ChapterService } from 'src/chapter/chapter.service';

@Injectable()
export class TitleService {
  /**
   * @param  {any} title
   * @returns ChapterModel
   */
  static getChaptersFromTitleJSON(title: any): ChapterModel[] {
    const transformedChapterArray: ChapterModel[] = [];
    const chapterArray = title.hasPart;

    if (title.name == 'TÍTULO II') {
      console.log('--------------');
      console.log(chapterArray[0].hasPart[0].hasPart[0].workExample[0].text);
      console.log('--------------');
    }

    if (title.name !== 'TÍTULO I' && title.name !== 'TÍTULO IX') {
      for (let i = 0; i < chapterArray.length; i++) {
        if (chapterArray[i].legislationType !== 'Artigo') {
          const currentChapterArticles =
            ChapterService.getArticlesFromChapterJSON(chapterArray[i]);

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
        ChapterService.getArticlesFromNoTitleChapterJSON(title);
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
