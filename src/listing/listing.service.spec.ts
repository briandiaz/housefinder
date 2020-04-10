import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { PhotoService } from '../photo/photo.service';
import { PhotoRepository } from '../photo/photo.repository';

describe('ListingService', () => {
  let service: ListingService;
  let repository: ListingRepository;
  let photoService: PhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingService,
        ListingRepository,
        PhotoRepository,
        PhotoService
      ],
    }).compile();

    service = module.get<ListingService>(ListingService);
    repository = module.get<ListingRepository>(ListingRepository);
    photoService = module.get<PhotoService>(PhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(photoService).toBeDefined();
  });
});
