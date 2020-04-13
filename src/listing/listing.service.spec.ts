import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { PhotoService } from '../photo/photo.service';
import { PhotoRepository } from '../photo/photo.repository';
import { AmenityService } from '../amenity/amenity.service';
import { AmenityRepository } from '../amenity/amenity.repository';

describe('ListingService', () => {
  let service: ListingService;
  let repository: ListingRepository;
  let photoService: PhotoService;
  let amenityService: AmenityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListingService,
        ListingRepository,
        PhotoRepository,
        PhotoService,
        AmenityRepository,
        AmenityService,
      ],
    }).compile();

    service = module.get<ListingService>(ListingService);
    repository = module.get<ListingRepository>(ListingRepository);
    photoService = module.get<PhotoService>(PhotoService);
    amenityService = module.get<AmenityService>(AmenityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(photoService).toBeDefined();
    expect(amenityService).toBeDefined();
  });
});
