import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRO } from './interfaces/user.interface';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return await this.userRepository.signUp(signUpCredentials);
  }

  async signIn(signInCredentials: SignInCredentialsDTO): Promise<JwtPayload> {
    const user = await this.userRepository.validateCredentials(signInCredentials);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const accessToken = await this.jwtService.sign(user);

    return this.generateJwtPayload(user, accessToken);
  }

  private generateJwtPayload(user, accessToken): JwtPayload {
    return {
      user,
      accessToken,
    };
  }
}
