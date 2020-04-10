import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { AuthenticationService } from './authentication.service';
import { UserRO } from './interfaces/user.interface';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Singup user.' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'Conflict Request.' })
  async signUp(@Body(ValidationPipe) signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return this.authenticationService.signUp(signUpCredentials);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Create session' })
  @ApiResponse({ status: 201, description: 'The session has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async signIn(@Body() signInCredentials: SignInCredentialsDTO): Promise<JwtPayload> {
    return this.authenticationService.signIn(signInCredentials);
  }
}
