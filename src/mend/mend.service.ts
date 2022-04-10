import { Injectable } from '@nestjs/common';
import { MendModel, MendType, ChangeType } from './mend.model';

@Injectable()
export class MendService {
  static getForeseenChangesFromArticleJson(articleJson: any): MendModel[] {
    const mends: MendModel[] = [];

    const foreseenChangesJSON = articleJson.legislationForeseesChangedBy;
    if (Array.isArray(foreseenChangesJSON)) {
      for (let i = 0; i < foreseenChangesJSON.length; i++) {
        const newMend: MendModel = {
          id: foreseenChangesJSON[i]['@id'],
          changeType: ChangeType.FORESEEN,
          mendType: MendType.LAW,
        };
        mends.push(newMend);
      }
    }
    return mends;
  }
}
