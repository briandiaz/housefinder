import { Module } from '@nestjs/common';
import { AmenityService } from './amenity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenityRepository } from './amenity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AmenityRepository,
    ]),
  ],
  providers: [AmenityService],
  exports: [
    AmenityService,
  ],
})
export class AmenityModule {}
