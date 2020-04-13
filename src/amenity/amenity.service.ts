import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmenityRepository } from './amenity.repository';
import { AddAmenityDTO } from './dtos/add-amenity.dto';
import { AmenityEntity } from './amenity.entity';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(AmenityRepository)
    private readonly amenityRepository: AmenityRepository,
  ) { }

  async findManyByIds(addAmenityDTOs: AddAmenityDTO[]): Promise<Array<AmenityEntity>> {
    const amenityIds = addAmenityDTOs.map((addAmenityDTO) => addAmenityDTO.id);

    return await this.amenityRepository.findManyByIds(amenityIds);
  }
}
