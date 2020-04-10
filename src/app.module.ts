import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { ListingModule } from './listing/listing.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthenticationModule,
    ListingModule,
    PhotoModule
  ],
})
export class AppModule { }
