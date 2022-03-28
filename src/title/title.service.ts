import { Injectable } from '@nestjs/common';

import { ChapterModel } from 'src/chapter/chapter.model';
import { ChapterService } from 'src/chapter/chapter.service';

@Injectable()
export class TitleService {
  /**
   * @param  {any} title
   * @returns ChapterModel
   */
  static getChaptersFromTitleJson(title: any): ChapterModel[] {
    const transformedChapterArray: ChapterModel[] = [];
    const chapterArray = title.hasPart;

    for (let i = 0; i < chapterArray.length; i++) {
      if (chapterArray[i].legislationType !== 'Artigo') {
        const currentChapterArticles = ChapterService.getArticlesFromChapter(
          chapterArray[i],
        );

        const newChapter: ChapterModel = {
          name: chapterArray[i].name,
          id: chapterArray[i]['@id'],
          text: chapterArray[i].text,
          legislationIdentifier: chapterArray[i].legislationIdentifier,
          articles: currentChapterArticles,
        };
        transformedChapterArray.push(newChapter);
      }
    }
    return transformedChapterArray;
  }
}
