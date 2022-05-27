import { DocumentModel } from 'src/document/document.model';
import { MendModel } from 'src/mend/mend.model';
import { ParagraphModel } from 'src/paragraph/paragraph.model';

export interface ArticleModel extends DocumentModel {
  name: string;
  children: ParagraphModel[];
  value: number;
  foreseenChanges: MendModel[];
}
