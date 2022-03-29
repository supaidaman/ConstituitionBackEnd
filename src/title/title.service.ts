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

    for (let i = 0; i < chapterArray.length; i++) {
      if (chapterArray[i].legislationType !== 'Artigo') {
        const currentChapterArticles =
          ChapterService.getArticlesFromChapterJSON(chapterArray[i]);

        const newChapter: ChapterModel = {
          name: chapterArray[i].name,
          id: chapterArray[i]['@id'],
          text: chapterArray[i].text,
          legislationIdentifier: chapterArray[i].legislationIdentifier,
          articles: currentChapterArticles,
        };
        transformedChapterArray.push(newChapter);
      } else {
        const currentChapterArticles =
          ChapterService.getArticlesFromFirstChapterJSON(title);
        const newChapter: ChapterModel = {
          name: '',
          id: '',
          text: 'CAPÍTULO ÚNICO',
          legislationIdentifier: '',
          articles: currentChapterArticles,
        };
        transformedChapterArray.push(newChapter);
      }
    }
    return transformedChapterArray;
  }
}
