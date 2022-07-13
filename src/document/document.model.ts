import { MendModel } from 'src/mend/mend.model';

export interface DocumentModel {
  legislationIdentifier: string;
  id: string;
  legislationType: string;
  foreseenChanges: MendModel[];
}
