import { DocumentModel } from 'src/document/document.model';

export interface ChapterModel extends DocumentModel {
  name: string;
  text: string;
}
