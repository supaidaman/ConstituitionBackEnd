import { Injectable } from '@nestjs/common';
import { ChapterModel } from 'src/article/chapter.model';

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
      const newArticle: ChapterModel = {
        name: chapterArray[i].name,
        id: chapterArray[i]['@id'],
        text: chapterArray[i].text,
        legislationIdentifier: chapterArray[i].legislationIdentifier,
      };

      transformedChapterArray.push(newArticle);
    }
    return transformedChapterArray;
  }
}
