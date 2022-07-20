import { Test, TestingModule } from '@nestjs/testing';
import { NormasApiService } from './normas-api.service';

describe('NormasApiService', () => {
  let service: NormasApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NormasApiService],
    }).compile();

    service = module.get<NormasApiService>(NormasApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
