import { Test, TestingModule } from '@nestjs/testing';
import { StaticContentController } from './static-content.controller';

describe('StaticContent Controller', () => {
  let controller: StaticContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticContentController],
    }).compile();

    controller = module.get<StaticContentController>(StaticContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
