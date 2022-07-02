import { ClauseModel } from 'src/clause/clause.model';
import { DocumentModel } from 'src/document/document.model';

export interface ParagraphModel extends DocumentModel {
  name: string;
  text: string;
  value: number;
  clauses: ClauseModel[];
}
