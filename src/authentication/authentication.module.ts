import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/constants';

const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPIRES_IN,
      },
    }),
    passportModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy,
  ],
  exports: [
    JwtStrategy,
    passportModule,
  ],
})
export class AuthenticationModule {}
