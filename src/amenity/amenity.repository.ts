import { Repository, EntityRepository } from "typeorm";
import { AmenityEntity } from "./amenity.entity";

@EntityRepository(AmenityEntity)
export class AmenityRepository extends Repository<AmenityEntity> {
  async findManyByIds(amenityIds: string[]): Promise<Array<AmenityEntity>> {
    const amenities = await AmenityEntity.createQueryBuilder()
      .where('id IN (:...amenityIds)', { amenityIds })
      .getMany();
    return amenities;
  }
}
