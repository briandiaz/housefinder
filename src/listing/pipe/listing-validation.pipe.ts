import { PipeTransform, BadRequestException } from "@nestjs/common";
import { CoordinatesDTO } from "../dtos/coordinates.dto";
import { ListingTypeEnum } from "../enums/listing-type.enum";
import { ListingUnitTypeEnum } from "../enums/listing-unit-type.enum";

export class ListingValidation implements PipeTransform {
  readonly allowedListingType = [
    ListingTypeEnum.APARTMENT,
    ListingTypeEnum.HOTEL,
    ListingTypeEnum.HOUSE,
    ListingTypeEnum.PENTHOUSE,
    ListingTypeEnum.ROOM,
  ];
  readonly allowedUnitType = [
    ListingUnitTypeEnum.PER_DAY,
    ListingUnitTypeEnum.PER_MONTH,
    ListingUnitTypeEnum.PER_HOUR,
  ]

  transform(value: any) {
    if (value.coordinates && !this.isCoordinates(value.coordinates)) {
      throw new BadRequestException('Coordinates are not valid');
    }

    if (value.listingType && !this.isListingTypeValid(value.listingType)) {
      throw new BadRequestException(`listingType is not valid.`);
    }

    if (value.unitType && !this.isUnitTypeValid(value.unitType)) {
      throw new BadRequestException(`unitType is not valid.`);
    }

    return value;
  }

  private isListingTypeValid(listingType: any): boolean {
    return this.allowedListingType.includes(listingType);
  }

  private isUnitTypeValid(unitType: any): boolean {
    return this.allowedUnitType.includes(unitType);
  }

  private isCoordinates = (data: CoordinatesDTO): boolean => {
    const { latitude, longitude } = data;
    if (!latitude || !longitude) return false;
  
    if (isNaN(latitude) || isNaN(longitude)) return false;
  
    return true;
  };
}