import { Test, TestingModule } from '@nestjs/testing';
import { AccountHtmxController } from './account.htmx.controller';

describe('AccountController', () => {
  let controller: AccountHtmxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountHtmxController],
    }).compile();

    controller = module.get<AccountHtmxController>(AccountHtmxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
