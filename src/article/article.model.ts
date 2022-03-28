import { DocumentModel } from 'src/document/document.model';
import { ParagraphModel } from 'src/paragraph/paragraph.model';

export interface ArticleModel extends DocumentModel {
  name: string;
  paragraphs: ParagraphModel[];
}
