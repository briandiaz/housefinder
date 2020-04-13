import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { ListingEntity } from "./listing.entity";
import { UserEntity } from "../authentication/user.entity";
import { ListingDTO } from "./dtos/listing.dto";
import { ListingRO } from "./interfaces/listing.interface";
import { AmenityDTO } from "../amenity/dtos/amenity.dto";
import { AmenityEntity } from "../amenity/amenity.entity";

@EntityRepository(ListingEntity)
export class ListingRepository extends Repository<ListingEntity> {
  async createOne(listingDTO: ListingDTO, user: UserEntity): Promise<ListingRO> {
    let listing;

    try {
      listing = await ListingEntity
        .fromDTO(listingDTO, user)
        .save();
    } catch(error) {
      throw new InternalServerErrorException(error.message);
    }

    return ListingEntity.toRO(listing);
  }

  async addAmenities(listing: ListingEntity, amenities: AmenityEntity[]): Promise<Array<AmenityDTO>> {
    amenities.map((amenity) => listing.amenities.push(amenity));

    try {
      await listing.save();
      return listing.amenities;
    } catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeAmenities(listing: ListingEntity, amenities: AmenityEntity[]): Promise<Array<AmenityDTO>> {
    const listingAmenities = listing.amenities || [];
    const amenitiesDeleteIDs = amenities.map((amenity) => amenity.id);

    listing.amenities = listingAmenities.filter((amenity) => !amenitiesDeleteIDs.includes(amenity.id));

    try {
      await listing.save();
      return listing.amenities;
    } catch(error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}