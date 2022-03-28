import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConstitutionController } from './constitution/constitution.controller';
// import { ConstitutionService } from './constitution/constitution.service';
import { ConstitutionModule } from './constitution/constitution.module';
import { TitleService } from './title/title.service';
import { ArticleService } from './article/article.service';
import { ChapterService } from './chapter/chapter.service';
import { ParagraphService } from './paragraph/paragraph.service';

@Module({
  imports: [ConstitutionModule],
  providers: [TitleService, ArticleService, ChapterService, ParagraphService],
  // controllers: [AppController, ConstitutionController],
  // providers: [AppService, ConstitutionService],
})
export class AppModule {}
