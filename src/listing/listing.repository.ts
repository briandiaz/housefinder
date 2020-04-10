import { Repository, EntityRepository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { ListingEntity } from "./listing.entity";
import { UserEntity } from "../authentication/user.entity";
import { ListingDTO } from "./dtos/listing.dto";
import { ListingRO } from "./interfaces/listing.interface";

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
}