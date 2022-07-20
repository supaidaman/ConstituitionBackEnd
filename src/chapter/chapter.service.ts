import { Injectable } from '@nestjs/common';
import { ArticleModel } from 'src/article/article.model';
import { ArticleService } from 'src/article/article.service';
import { MendService } from 'src/mend/mend.service';
import { ParagraphService } from 'src/paragraph/paragraph.service';
import { ChapterModel } from './chapter.model';
import { titleCase } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
import { ChangeType } from 'src/mend/mend.model';

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
          const foreseenChanges = MendService.getChangesFromArticleJson(
            chapterArray[i],
            ChangeType.FORESEEN,
          );
          const alreadyAppliedChanges = MendService.getChangesFromArticleJson(
            chapterArray[i],
            ChangeType.PASSED,
          );
          const newChapter: ChapterModel = {
            name: titleCase(
              chapterArray[i].name === ''
                ? chapterArray[i].text
                : chapterArray[i].name,
            ),
            id: chapterArray[i]['@id'],
            text: chapterArray[i].hasPart[0].hasPart[0].workExample[0].text,
            legislationIdentifier: chapterArray[i].legislationIdentifier,
            legislationType: chapterArray[i].legislationType,
            value: sum,
            articles: currentChapterArticles,
            foreseenChanges: foreseenChanges,
            alreadyAppliedChanges: alreadyAppliedChanges,
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
        name: titleCase('CAPÍTULO ÚNICO - ' + title.name),
        id: uuidv4(),
        text: 'CAPÍTULO ÚNICO',
        legislationIdentifier: '',
        value: sum,
        articles: currentChapterArticles,
        legislationType: 'Original_Version',
        foreseenChanges: null,
        alreadyAppliedChanges: null,
      };
      transformedChapterArray.push(newChapter);
    }
    return transformedChapterArray;
  }
}
