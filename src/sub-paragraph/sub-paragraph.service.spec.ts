import { Test, TestingModule } from '@nestjs/testing';
import { SubParagraphService } from './sub-paragraph.service';

describe('SubParagraphService', () => {
  let service: SubParagraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubParagraphService],
    }).compile();

    service = module.get<SubParagraphService>(SubParagraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
