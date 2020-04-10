import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";
import { PASSWORD_REGEX } from '../../config/constants';
import { ApiProperty } from "@nestjs/swagger";

export class SignUpCredentialsDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @IsNotEmpty()
  @Matches(
    PASSWORD_REGEX,
    {
      message: 'password is too weak.'
    },
  )
  password: string;
}