import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { ConstitutionService } from './constitution.service';

@Controller('constitution')
export class ConstitutionController {
  constructor(
    private constitutionService: ConstitutionService,
    private httpService: HttpService,
  ) {}

  @Get()
  async getFullConstitution(): Promise<string> {
    const axiosRequest = await this.httpService.get(
      'https://normas.leg.br/api/normas?urn=urn:lex:br:federal:constituicao:1988-10-05;1988&&tipo_documento=maior-detalhe',
    );
    await this.constitutionService.processDataFromNormasAPI(axiosRequest);
    return this.constitutionService.getFullConstitution();
  }
}
