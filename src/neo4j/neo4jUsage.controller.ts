import { Controller, Get } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';

@Controller('neo4j')
export class Neo4jUsageController {
  constructor(private readonly neo4jUsageService: Neo4jService) {}

  @Get()
  async getDB(): Promise<any> {
    // console.log('aaaa');
    const res = await this.neo4jUsageService.read(
      `MATCH (n) RETURN count(n) AS count`,
    );
    return `There are ${res.records[0].get('count')} nodes in the database`;
  }
}
