import { ApiProperty } from "@nestjs/swagger";
import { PhotoStatusEnum } from "../enums/photo-status.enum";
import { ListingEntity } from "../../listing/listing.entity";
import { IsString, IsNotEmpty } from "class-validator";

export class PhotoDTO implements Readonly<PhotoDTO> {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ required: true, enum: PhotoStatusEnum })
  @IsString()
  @IsNotEmpty()
  status: PhotoStatusEnum;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  listing: ListingEntity;
}
