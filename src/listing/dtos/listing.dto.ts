import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsInt, IsBoolean } from "class-validator";
import { ListingTypeEnum } from "../enums/listing-type.enum";
import { ListingUnitTypeEnum } from "../enums/listing-unit-type.enum";
import { CoordinatesDTO } from './coordinates.dto';

export class ListingDTO implements Readonly<ListingDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  guestCount: number;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  roomCount: number;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  bedCount: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  bathroomCount: number;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  floor: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  coordinates: CoordinatesDTO;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  squareFeet: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  notes: string;

  @ApiProperty({ required: false })
  @IsString()
  rules: string;

  @ApiProperty({ required: true })
  @IsInt()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  listingType: ListingTypeEnum;

  @ApiProperty({ required: false })
  @IsBoolean()
  isPetFriendly: boolean;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  unitType: ListingUnitTypeEnum;
}