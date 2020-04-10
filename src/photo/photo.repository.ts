import { PhotoEntity } from "./photo.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(PhotoEntity)
export class PhotoRepository extends Repository<PhotoEntity> {
  
}