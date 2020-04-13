import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddAmenityDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsUUID()
  id: string;
}