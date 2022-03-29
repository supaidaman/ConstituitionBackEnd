import { DocumentModel } from 'src/document/document.model';

export interface ClauseModel extends DocumentModel {
  name: string;
  text: string;
}
