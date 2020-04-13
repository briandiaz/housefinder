import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingRepository } from './listing.repository';
import { AuthenticationModule } from '../authentication/authentication.module';
import { PhotoModule } from '../photo/photo.module';
import { PhotoRepository } from '../photo/photo.repository';
import { UserRepository } from '../authentication/user.repository';
import { AmenityModule } from '../amenity/amenity.module';
import { AmenityRepository } from '../amenity/amenity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository,
      PhotoRepository,
      UserRepository,
      AmenityRepository,
    ]),
    AuthenticationModule,
    PhotoModule,
    AmenityModule,
  ],
  controllers: [ListingController],
  providers: [ListingService]
})
export class ListingModule {}
