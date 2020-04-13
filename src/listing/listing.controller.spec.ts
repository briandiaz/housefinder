import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { PhotoRepository } from '../photo/photo.repository';
import { PhotoService } from '../photo/photo.service';
import { AmenityService } from '../amenity/amenity.service';
import { AmenityRepository } from '../amenity/amenity.repository';

describe('Listing Controller', () => {
  let controller: ListingController;
  let service: ListingService;
  let photoService: PhotoService;
  let amenityService: AmenityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [
        ListingService,
        ListingRepository,
        PhotoRepository,
        PhotoService,
        AmenityRepository,
        AmenityService,
      ],
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
    }).compile();

    controller = module.get<ListingController>(ListingController);
    service = module.get<ListingService>(ListingService);
    photoService = module.get<PhotoService>(PhotoService);
    amenityService = module.get<AmenityService>(AmenityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(photoService).toBeDefined();
    expect(amenityService).toBeDefined();
  });
});
