import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
// import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const { id } = payload;
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Not valid token');
    }

    return user;
  }

}