import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingRepository } from './listing.repository';
import { AuthenticationModule } from '../authentication/authentication.module';
import { PhotoModule } from '../photo/photo.module';
import { PhotoRepository } from '../photo/photo.repository';
import { UserRepository } from '../authentication/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository,
      PhotoRepository,
      UserRepository,
    ]),
    AuthenticationModule,
    PhotoModule,
  ],
  controllers: [ListingController],
  providers: [ListingService]
})
export class ListingModule {}
