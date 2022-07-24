import { Injectable } from '@nestjs/common';
import { ChangeType, MendModel, MendType } from 'src/mend/mend.model';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require('sync-request');
// var res = request('GET', 'http://example.com');
// console.log(res.getBody());
@Injectable()
export class NormasApiService {
  static getMendFromNormasURI(url: string): MendModel {
    const params = new URLSearchParams(url.substring(1));

    const urnValue = params.values().next();

    const templateURL = `https://normas.leg.br/api/normas?urn=${urnValue.value}&&tipo_documento=maior-detalhe`;

    // const res = request('GET', templateURL);
    // const bodyAnswer = JSON.parse(res.body.toString());
    const newMend: MendModel = {
      id: uuidv4(),
      urn: templateURL,
      changeType: ChangeType.FORESEEN,
      mendType: MendType.LAW,
      name: 'bodyAnswer.description',
      alternateName: 'bodyAnswer.alternateName',
      keywords: [], //bodyAnswer.keywords, //TODO FIX BY ID - EMENDA OU LEI
    };
    //TODO AT END GO THROUGH EVERY URL AND UPDATE...:?
    return newMend;
  }
}

//TODO COMO FAZER REQUESTS??
//SALVAR NUM ARQUIVO E FAZER DEPOIS :THINKING:
