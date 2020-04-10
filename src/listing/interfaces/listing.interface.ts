import { ListingTypeEnum } from "../enums/listing-type.enum";
import { ListingUnitTypeEnum } from "../enums/listing-unit-type.enum";
import { PhotoEntity } from '../../photo/photo.entity';
import { CoordinatesDTO } from "../dtos/coordinates.dto";

export interface ListingRO {
  id: string;
  name: string;
  guestCount: number;
  roomCount: number;
  bedCount: number;
  bathroomCount: number;
  floor: number;
  coordinates: CoordinatesDTO;
  squareFeet: number;
  description: string;
  notes: string;
  rules: string;
  rating: number;
  listingType: ListingTypeEnum;
  isPetFriendly: boolean;
  price: number;
  unitType: ListingUnitTypeEnum;
  hostId: string;
  photos: PhotoEntity[];
}