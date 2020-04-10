import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInCredentialsDTO {
  @ApiProperty({ required: false })
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  username?: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}