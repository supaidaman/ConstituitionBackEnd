import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { Neo4jService } from 'nest-neo4j';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/neo4j')
  // async getDB(): Promise<any> {
  //   console.log('aaaa');
  //   const res = await this.neo4jService.read(
  //     `MATCH (n) RETURN count(n) AS count`,
  //   );

  //   return `There are ${res.records[0].get('count')} nodes in the database`;
  // }
  @Get()
  async getHello(): Promise<any> {
    this.appService.getHello();
  }
}
