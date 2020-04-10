import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { UserEntity } from "./user.entity";
import { SignUpCredentialsDTO } from "./dtos/signup-credentials.dto";
import { SignInCredentialsDTO } from "./dtos/signin-credentials.dto";
import { ERROR_CODES, CONSTRAINTS } from '../config/constants';
import { UserRO } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signUp(signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    const { name, username, email, password } = signUpCredentials;
    const salt = await bcrypt.genSalt();

    const user = new UserEntity();
    user.name = name;
    user.email = email;
    user.username = username;
    user.salt = salt;
    user.password = await this.generateHashPassword(password, salt);

    let savedUser = null;

    try {
      savedUser = await user.save();
    } catch(error) {
      if (error.code === ERROR_CODES.DUPLICATE) {
        const fieldName = CONSTRAINTS[error.constraint].field;
        throw new BadRequestException(`user with '${fieldName}' already exists.`);
      }
      throw new InternalServerErrorException(error.message);
    }

    return this.generateUserRO(savedUser);
  }

  async validateCredentials(signInCredentials: SignInCredentialsDTO): Promise<UserRO> {
    const { username, email, password }  = signInCredentials;

    const user = await this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

    if (user && (await user.isValidPassword(password))) {
      return this.generateUserRO(user);
    }

    return null;
  }

  private generateUserRO(user: UserEntity): UserRO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
    }
  }

  private async generateHashPassword(password: string, salt: string): Promise<string>{
    return bcrypt.hash(password, salt);
  }
}