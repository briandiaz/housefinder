import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from './authentication.service';
import { UserRepository } from './user.repository';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';
import { UserRO } from './interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

const mockUserRepository = () => ({
  signUp: jest.fn(),
  save: jest.fn(),
  validateCredentials: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: getRepositoryToken(UserRepository),
          useFactory: mockUserRepository,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        }
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('signUp', () => {
    it('should save user info from credentials provided.', async () => {
      const mock: SignUpCredentialsDTO = {
        name: 'Brad Paulsen',
        email: 'brad.paulsen@mydomain.com',
        username: 'bradpaulsen',
        password: 'Br4dhey2320',
      };
      const expectedResult: UserRO = {
        name: mock.name,
        username: mock.username,
        email: mock.email,
      };
      jest.spyOn(userRepository, 'signUp').mockResolvedValue(expectedResult);
      expect(userRepository.signUp).not.toHaveBeenCalled();

      const response = await service.signUp(mock);

      expect(userRepository.signUp).toHaveBeenCalled();
      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });

  describe('signIn', () => {
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
      jest.spyOn(jwtService, 'sign').mockReturnValue(expectedResult.accessToken);
      jest.spyOn(userRepository, 'validateCredentials').mockResolvedValue(userRO);
      expect(userRepository.validateCredentials).not.toHaveBeenCalled();

      const response = await service.signIn(mock);

      expect(userRepository.validateCredentials).toHaveBeenCalled();
      expect(response).toBeDefined();
      expect(response).toStrictEqual(expectedResult);
    });
  });
});
