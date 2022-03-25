import { ChapterModel } from 'src/article/chapter.model';
import { DocumentModel } from 'src/document/document.model';

export interface TitleModel extends DocumentModel {
  name: string;
  text: string;
  chapters: ChapterModel[];
}
