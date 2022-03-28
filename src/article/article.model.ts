import { DocumentModel } from 'src/document/document.model';

export interface ArticleModel extends DocumentModel {
  name: string;
  text: string;
}
