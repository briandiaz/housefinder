import { Injectable, NotFoundException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingDTO } from './dtos/listing.dto';
import { UserEntity } from '../authentication/user.entity';
import { ListingEntity } from './listing.entity';
import { PhotoService } from '../photo/photo.service';
import { PhotoRO } from '../photo/interfaces/photo-ro.interface';
import { ListingRO } from './interfaces/listing.interface';
import { AddAmenityDTO } from '../amenity/dtos/add-amenity.dto';
import { AmenityDTO } from '../amenity/dtos/amenity.dto';
import { AmenityService } from '../amenity/amenity.service';
import { RemoveAmenityDTO } from '../amenity/dtos/remove-amenity.dto';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(ListingRepository)
    private readonly listingRepository: ListingRepository,
    private readonly photoService: PhotoService,
    private readonly amenityService: AmenityService,
  ) {}

  async getAll(): Promise<Array<ListingEntity>> {
    return await this.listingRepository.find({});
  }

  async getOne(id: string): Promise<ListingEntity> {
    return this.getById(id, { relations: ['amenities'] });
  }

  async create(listingDTO: ListingDTO, user: UserEntity): Promise<ListingRO> {
    return await this.listingRepository.createOne(listingDTO, user);
  }

  async addPhoto(listingId: string, file: any): Promise<PhotoRO> {
    const listing = await this.getById(listingId);

    return await this.photoService.createOne(file, listing);
  }

  async addAmenities(listingId: string, addAmenitiesDTO: AddAmenityDTO[]): Promise<Array<AmenityDTO>> {
    const listing = await this.getById(listingId, { relations: ["amenities"] });

    const amenities = await this.amenityService.findManyByIds(addAmenitiesDTO);

    return await this.listingRepository.addAmenities(listing, amenities);
  }

  async removeAmenities(listingId: string, removeAmenitiesDTO: RemoveAmenityDTO[]): Promise<Array<AmenityDTO>> {
    const listing = await this.getById(listingId, { relations: ["amenities"] });

    const amenities = await this.amenityService.findManyByIds(removeAmenitiesDTO);

    return await this.listingRepository.removeAmenities(listing, amenities);
  }

  private async getById(id: string, options = {}): Promise<ListingEntity> {
    const listing = await this.listingRepository.findOne(id, options);

    if (!listing) throw new NotFoundException('Listing not found');

    return listing;
  }
}
