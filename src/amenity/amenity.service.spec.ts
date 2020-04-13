import { Test, TestingModule } from '@nestjs/testing';
import { AmenityService } from './amenity.service';
import { AmenityRepository } from './amenity.repository';

describe('AmenityService', () => {
  let service: AmenityService;
  let repository: AmenityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmenityRepository,
        AmenityService
      ],
    }).compile();

    service = module.get<AmenityService>(AmenityService);
    repository = module.get<AmenityRepository>(AmenityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
