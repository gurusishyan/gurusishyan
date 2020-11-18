import { Test, TestingModule } from '@nestjs/testing';
import { StaticContentService } from './static-content.service';

describe('StaticContentService', () => {
  let service: StaticContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticContentService],
    }).compile();

    service = module.get<StaticContentService>(StaticContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
