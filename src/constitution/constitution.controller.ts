import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { ConstitutionModel } from 'src/constitution.model';
import { ConstitutionService } from './constitution.service';

@Controller('constitution')
export class ConstitutionController {
  constructor(
    private constitutionService: ConstitutionService,
    private httpService: HttpService,
  ) {}

  @Get()
  async getFullConstitution(): Promise<ConstitutionModel> {
    const axiosRequest = await this.httpService.get(
      'https://normas.leg.br/api/normas?urn=urn:lex:br:federal:constituicao:1988-10-05;1988&&tipo_documento=maior-detalhe',
    );
    const constitution =
      await this.constitutionService.processDataFromNormasAPI(axiosRequest);
    return constitution;
    //return this.constitutionService.getFullConstitution();
  }
}
