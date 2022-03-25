import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConstitutionController } from './constitution/constitution.controller';
// import { ConstitutionService } from './constitution/constitution.service';
import { ConstitutionModule } from './constitution/constitution.module';
import { TitleService } from './title/title.service';

@Module({
  imports: [ConstitutionModule],
  providers: [TitleService],
  // controllers: [AppController, ConstitutionController],
  // providers: [AppService, ConstitutionService],
})
export class AppModule {}
