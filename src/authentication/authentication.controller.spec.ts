import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRepository } from './user.repository';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';
import { UserRO } from './interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const mockUserRepository = () => ({
  signUp: jest.fn(),
});

const mockJwtService = () => ({
  signUp: jest.fn(),
});

describe('Authentication Controller', () => {
  let controller: AuthenticationController;
  let authenticationService: AuthenticationService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: mockUserRepository
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        }
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authenticationService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('POST /signup', () => {
    it('should save user info from credentials provided.', async () => {
      const mock: SignUpCredentialsDTO = {
        name: 'Brad Paulsen',
        email: 'brad.paulsen@mydomain.com',
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const expectedResult: UserRO = {
        id: 'my-id',
        name: mock.name,
        username: mock.username,
        email: mock.email,
      };
      jest.spyOn(authenticationService, 'signUp').mockResolvedValue(expectedResult);

      const response = await controller.signUp(mock);

      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });

  describe('POST /signin', () => {
    it('should return a session from credentials provided.', async () => {
      const mock: SignInCredentialsDTO = {
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const userRO: UserRO = {
        name: 'Brad',
        username: mock.username,
        email: mock.email,
      }
      const expectedResult: JwtPayload = {
        user: userRO,
        accessToken: 'my-jwt-token',
      };
      jest.spyOn(authenticationService, 'signIn').mockResolvedValue(expectedResult);

      const response = await controller.signIn(mock);

      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
