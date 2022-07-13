import { Module } from '@nestjs/common';
import { Neo4jUsageController } from './neo4jUsage.controller';

@Module({
  controllers: [Neo4jUsageController],
})
export class Neo4jUsageModule {}
