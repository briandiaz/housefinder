import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { AmenityCategory } from "../enums/amenity-category.enum";
import { ApiProperty } from "@nestjs/swagger";

export class AmenityDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  category: AmenityCategory;
}