import { DocumentModel } from 'src/document/document.model';
import { SubParagraphModel } from 'src/sub-paragraph/sub-paragraph.model';

export interface ClauseModel extends DocumentModel {
  name: string;
  text: string;
  subparagraphs: SubParagraphModel[];
  value: number;
}
