import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CoordinatesDTO {
  @ApiProperty({ required: true })
  @IsNumber()
  latitude: number;

  @ApiProperty({ required: true })
  @IsNumber()
  longitude: number;
}