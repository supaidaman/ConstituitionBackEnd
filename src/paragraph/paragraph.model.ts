import { DocumentModel } from 'src/document/document.model';

export interface ParagraphModel extends DocumentModel {
  name: string;
  text: string;
  isInciso: boolean;
}
