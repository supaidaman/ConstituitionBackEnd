import { DocumentModel } from 'src/document/document.model';

export interface SubParagraphModel extends DocumentModel {
  name: string;
  text: string;
}
