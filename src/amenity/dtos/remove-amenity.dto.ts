import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RemoveAmenityDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsUUID()
  id: string;
}