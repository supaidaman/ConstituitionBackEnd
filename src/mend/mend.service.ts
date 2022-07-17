import { Injectable } from '@nestjs/common';
import { MendModel, MendType, ChangeType } from './mend.model';

@Injectable()
export class MendService {
  static getChangesFromArticleJson(
    articleJson: any,
    changeType: ChangeType,
  ): MendModel[] {
    if (articleJson.name == 'LXXVIII –') {
      console.log(articleJson);
      console.log('-----externo-----');
      console.log('workArray');
    }
    if (changeType == ChangeType.FORESEEN) {
      return MendService.foreseenChanges(articleJson);
    }
    return MendService.alreadyAppliedChanges(articleJson);
  }

  static foreseenChanges(articleJson: any): MendModel[] {
    const mends: MendModel[] = [];
    const changesFromJson = articleJson.legislationForeseesChangedBy;
    if (Array.isArray(changesFromJson)) {
      for (let i = 0; i < changesFromJson.length; i++) {
        const newMend: MendModel = {
          id: changesFromJson[i]['@id'],
          changeType: ChangeType.FORESEEN,
          mendType: MendType.LAW, //TODO FIX BY ID - EMENDA OU LEI
        };
        mends.push(newMend);
      }
      // NAVEGAR ATÉ LINK E PEGAR DADOS COMPLETOS
    }
    return mends;
  }

  static alreadyAppliedChanges(articleJson: any): MendModel[] {
    const mends: MendModel[] = [];
    const workArray = articleJson.workExample; // array de workExample
    if (articleJson.name == 'LXXVIII –') {
      console.log(articleJson);
      console.log('----------');
      console.log(workArray);
    }

    for (let i = 0; i < workArray.length; i++) {
      if (workArray[i].legislationCorrectedBy !== undefined)
        console.log(workArray[i].legislationCorrectedBy.name);
      //console.log('--------------------------------');
      // console.log(workArray[i].legislationCorrectedBy);
    }
    // const changesFromJson = articleJson.legislationForeseesChangedBy;
    // if (Array.isArray(changesFromJson)) {
    //   for (let i = 0; i < changesFromJson.length; i++) {
    //     const newMend: MendModel = {
    //       id: changesFromJson[i]['@id'],
    //       changeType: ChangeType.FORESEEN,
    //       mendType: MendType.LAW, //TODO FIX BY ID - EMENDA OU LEI
    //     };
    //     mends.push(newMend);
    //   }
    //   // NAVEGAR ATÉ LINK E PEGAR DADOS COMPLETOS
    // }
    return mends;
  }
}
//TODO GET ARTIGO QUINTO
//VERIFICAR EMENDAS QUE PASSARAM:
//ESTRUTURA É ESSA

// "workExample": [
//   {
//     "additionalType": [
//       "Insertion"
//     ],
//     "legislationCorrectedBy": {
//       "@type": "Legislation",
//       "name": "Emenda Constitucional nº 115 de 10/02/2022",
//       "@id": "https://normas.leg.br/?urn=urn:lex:br:federal:emenda.constitucional:2022-02-10;115!art1_cpt"
//     },
//     "temporalCoverage": [
//       "2004-12-08/2022-02-09"
//     ],
//     "legislationConsolidates": {
//       "@type": "Legislation",
//       "name": "Emenda Constitucional nº 45 de 08/12/2004",
//       "@id": "https://normas.leg.br/?urn=urn:lex:br:federal:emenda.constitucional:2004-12-08;45!art1_cpt"
//     },
//     "legislationDate": "2004-12-08",
//     "@type": "Legislation",
//     "legislationLegalForce": "NotInForce",
//     "legislationIdentifier": "urn:lex:br:federal:constituicao:1988-10-05;1988!art5_cpt_inc78,emc-45-2004-12-08@2004-12-08",
//     "name": "LXXVIII –",
//     "legislationType": "Insertion_Version",
//     "@id": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!art5_cpt_inc78,emc-45-2004-12-08@2004-12-08",
//     "text": "a todos, no âmbito judicial e administrativo, são assegurados a razoável duração do processo e os meios que garantam a celeridade de sua tramitação."
//   },
//   {
//     "additionalType": [
//       "Text_Indirect_Change"
//     ],
//     "legislationConsolidates": {
//       "@type": "Legislation",
//       "name": "Emenda Constitucional nº 115 de 10/02/2022",
//       "@id": "https://normas.leg.br/?urn=urn:lex:br:federal:emenda.constitucional:2022-02-10;115!art1_cpt"
//     },
//     "legislationDate": "2022-02-10",
//     "@type": "Legislation",
//     "legislationIdentifier": "urn:lex:br:federal:constituicao:1988-10-05;1988!art5_cpt_inc78,emc-45-2004-12-08@2022-02-10",
//     "name": "LXXVIII –",
//     "legislationType": "Text_Indirect_Change_Version",
//     "@id": "https://normas.leg.br/?urn=urn:lex:br:federal:constituicao:1988-10-05;1988!art5_cpt_inc78,emc-45-2004-12-08@2022-02-10",
//     "text": "a todos, no âmbito judicial e administrativo, são assegurados a razoável duração do processo e os meios que garantam a celeridade de sua tramitação;"
//   }
// ],
