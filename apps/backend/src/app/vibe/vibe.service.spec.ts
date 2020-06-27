import { Test, TestingModule } from '@nestjs/testing';
import { VibeService } from './vibe.service';

describe('VibeService', () => {
  let service: VibeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VibeService],
    }).compile();

    service = module.get<VibeService>(VibeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
