import { Test, TestingModule } from '@nestjs/testing';
import { ManerService } from './maner.service';

describe('ManerService', () => {
  let service: ManerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManerService],
    }).compile();

    service = module.get<ManerService>(ManerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
