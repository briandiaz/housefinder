import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { ListingRepository } from './listing.repository';
import { PhotoRepository } from '../photo/photo.repository';
import { PhotoService } from '../photo/photo.service';

describe('Listing Controller', () => {
  let controller: ListingController;
  let service: ListingService;
  let photoRepository: PhotoRepository;
  let photoService: PhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [
        ListingService,
        ListingRepository,
        PhotoRepository,
        PhotoService
      ],
      imports: [
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
      ],
    }).compile();

    controller = module.get<ListingController>(ListingController);
    service = module.get<ListingService>(ListingService);
    photoRepository = module.get<PhotoRepository>(PhotoRepository);
    photoService = module.get<PhotoService>(PhotoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(photoRepository).toBeDefined();
    expect(photoService).toBeDefined();
  });
});
