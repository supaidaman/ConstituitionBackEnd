import { Test, TestingModule } from '@nestjs/testing';
import { MendService } from './mend.service';

describe('MendService', () => {
  let service: MendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MendService],
    }).compile();

    service = module.get<MendService>(MendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
