import { Test, TestingModule } from '@nestjs/testing';
import { ImploreController } from './implore.controller';

describe('Implore Controller', () => {
  let controller: ImploreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImploreController],
    }).compile();

    controller = module.get<ImploreController>(ImploreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
