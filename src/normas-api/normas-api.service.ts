import { Injectable } from '@nestjs/common';
import Axios from 'axios-observable';
import { map } from 'rxjs';

// var request = require('sync-request');
// var res = request('GET', 'http://example.com');
// console.log(res.getBody());
@Injectable()
export class NormasApiService {
  static getTextFromNormasURI(url: string) {
    const params = new URLSearchParams(url.substring(1));

    const urnValue = params.values().next();

    const templateURL = `https://normas.leg.br/api/normas?urn=${urnValue.value}&&tipo_documento=maior-detalh`;

    return Axios.get(templateURL).pipe(
      map((response) => {
        //console.log(response.data);
        console.log(response.data);
        return response;
      }),
    );
    // axios
    //   .get(templateURL)
    //   .then((response) => {
    //     //  console.log('---');
    //     console.log(response.data);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}

//TODO COMO FAZER REQUESTS??
//SALVAR NUM ARQUIVO E FAZER DEPOIS :THINKING:
