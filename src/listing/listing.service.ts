import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingDTO } from './dtos/listing.dto';
import { UserEntity } from '../authentication/user.entity';
import { ListingEntity } from './listing.entity';
import { PhotoService } from '../photo/photo.service';
import { PhotoRO } from '../photo/interfaces/photo-ro.interface';
import { ListingRO } from './interfaces/listing.interface';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(ListingRepository)
    private readonly listingRepository: ListingRepository,

    private readonly photoService: PhotoService,
  ) {}

  async getAll(): Promise<Array<ListingEntity>> {
    return await this.listingRepository.find({});
  }

  async getById(id: string): Promise<ListingEntity> {
    const listing = await this.listingRepository.findOne(id);

    if (!listing) throw new NotFoundException('Listing not found');

    return listing;
  }

  async create(listingDTO: ListingDTO, user: UserEntity): Promise<ListingRO> {
    return await this.listingRepository.createOne(listingDTO, user);
  }

  async addPhoto(listingID: string, file: any): Promise<PhotoRO> {
    const listing = await this.listingRepository.findOne(listingID);

    if (!listing) throw new NotFoundException('Listing not found');

    return await this.photoService.createOne(file, listing);
  }
}
