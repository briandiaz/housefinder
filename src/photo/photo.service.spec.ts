import { Test, TestingModule } from '@nestjs/testing';
import { PhotoService } from './photo.service';
import { PhotoRepository } from './photo.repository';

describe('PhotoService', () => {
  let service: PhotoService;
  let repository: PhotoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhotoService,
        PhotoRepository
      ],
    }).compile();

    service = module.get<PhotoService>(PhotoService);
    repository = module.get<PhotoRepository>(PhotoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
