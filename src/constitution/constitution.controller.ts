import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { ConstitutionService } from './constitution.service';

@Controller('constitution')
export class ConstitutionController {
  constructor(private constitutionService: ConstitutionService,private httpService: HttpService) {}

  @Get()
  async getFullConstitution(): Promise<string> {

    const axiosRequest = await this.httpService.get('https://normas.leg.br/api/normas?urn=urn:lex:br:federal:constituicao:1988-10-05;1988&&tipo_documento=maior-detalhe').pipe(map((res) => res.data));

    // you can use the data object now !!
    const data = await lastValueFrom(axiosRequest);
   
    console.log(data)
    var requestData = axiosRequest.pipe(
      map(response => response.data),
    );
    this.constitutionService.processDataFromNormasAPI(requestData)
    //console.log(requestData)
    return this.constitutionService.getFullConstitution();
  }
}
