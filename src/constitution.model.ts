import { TitleModel } from './title/title.model';

export class ConstitutionModel {
  constructor(
    private legislationDate: Date,
    private id: string,
    private titles: TitleModel[],
  ) {}
}
