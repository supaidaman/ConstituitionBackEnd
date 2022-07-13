import { Module } from '@nestjs/common';

import { ConstitutionModule } from './constitution/constitution.module';
import { TitleService } from './title/title.service';
import { ArticleService } from './article/article.service';
import { ChapterService } from './chapter/chapter.service';
import { ParagraphService } from './paragraph/paragraph.service';
import { ClauseService } from './clause/clause.service';
import { MendService } from './mend/mend.service';
import { SubParagraphService } from './sub-paragraph/sub-paragraph.service';
import { Neo4jModule } from 'nest-neo4j';
import { AppService } from './app.service';
import { Neo4jUsageModule } from './neo4j/neo4jUsage.module';

@Module({
  imports: [
    ConstitutionModule,
    // Neo4jModule.forRoot({
    //   scheme: 'neo4j',
    //   host: 'localhost',
    //   port: 7687,
    //   username: 'neo4j',
    //   password: 'neo',
    // }),
    // Neo4jUsageModule,
    //MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  providers: [
    AppService,
    TitleService,
    ArticleService,
    ChapterService,
    ParagraphService,
    ClauseService,
    MendService,
    SubParagraphService,
  ],
  // controllers: [AppController, ConstitutionController],
  // providers: [AppService, ConstitutionService],
})
export class AppModule {}
