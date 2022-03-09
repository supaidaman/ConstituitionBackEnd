import { Test, TestingModule } from '@nestjs/testing';
import { ConstitutionController } from './constitution.controller';

describe('ConstitutionController', () => {
  let controller: ConstitutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstitutionController],
    }).compile();

    controller = module.get<ConstitutionController>(ConstitutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
