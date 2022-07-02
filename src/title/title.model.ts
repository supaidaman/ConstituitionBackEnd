import { ChapterModel } from 'src/chapter/chapter.model';
import { DocumentModel } from 'src/document/document.model';

export interface TitleModel extends DocumentModel {
  name: string;
  text: string;
  chapters: ChapterModel[];
  value: number;
}
