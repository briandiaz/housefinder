import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoRepository } from './photo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  providers: [PhotoService],
  imports: [
    TypeOrmModule.forFeature([PhotoRepository])
  ],
  exports: [
    PhotoService,
  ],
})
export class PhotoModule {}
