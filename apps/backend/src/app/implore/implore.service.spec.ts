import { Test, TestingModule } from '@nestjs/testing';
import { ImploreService } from './implore.service';

describe('ImploreService', () => {
  let service: ImploreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImploreService],
    }).compile();

    service = module.get<ImploreService>(ImploreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
