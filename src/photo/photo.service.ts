import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PhotoRepository } from './photo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import * as Jimp from 'jimp';
import { PhotoEntity } from './photo.entity';
import { ListingEntity } from '../listing/listing.entity';
import { PhotoStatusEnum } from './enums/photo-status.enum';
import { PhotoRO } from './interfaces/photo-ro.interface';

const awsOpts = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};
const BUCKET = process.env.AWS_BUCKET;

const s3Client = new AWS.S3(awsOpts);

const OPTIMIZE_WIDTH = process.env.WIDTH ? parseInt(process.env.WIDTH, 10) : 700;
const OPTIMIZE_HEIGHT = process.env.HEIGHT ? parseInt(process.env.HEIGHT, 10) : Jimp.AUTO;
const OPTIMIZE_QUALITY = process.env.QUALITY ? parseInt(process.env.QUALITY, 10) : 70;

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoRepository)
    private readonly photoRepository: PhotoRepository,
  ) { }

  async createOne(file: any, listing: ListingEntity): Promise<PhotoRO> {
    const photoEntity = PhotoEntity.fromFile(file, listing);

    const photo = await this.photoRepository.save(photoEntity);

    const optimizedPhotoFile = await this.optimizeImage(file.buffer);

    try {
      const s3Photo = await this.uploadS3Image(optimizedPhotoFile, photo.fileName, file.mimetype);
      photo.status = PhotoStatusEnum.SUCCESS;
      photo.url = s3Photo.Location;
    } catch(error) {
      photo.status = PhotoStatusEnum.FAILED;
      throw new InternalServerErrorException(error.message);
    }

    const resultPhoto = await this.photoRepository.save({ ...photo });

    return PhotoEntity.toRO(resultPhoto);
  }

  private uploadS3Image(buffer: any, fileName: string, contentType: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      s3Client.upload({
          Bucket: BUCKET,
          Key: fileName,
          Body: buffer,
          ContentType: contentType,
          ACL: 'public-read',
      }, (error: any, response: any) => {
        if (error) {
          reject(`Error while trying to upload: ${error.message}`);
        }
  
        resolve(response);
      });
    });
  }

  private getJIMPImageBuffer(jimpImage: any): Promise<any> {
    return new Promise((resolve, reject) => {
      jimpImage.getBuffer(Jimp.AUTO, (error, buffer) => {
        if (error) {
          reject(`Error while trying to getBuffer: ${error.message}`);
        }
  
        resolve(buffer);
      })
    })
  }

  private async optimizeImage(
    imageBuffer: any,
    width: number = OPTIMIZE_WIDTH,
    height: number = OPTIMIZE_HEIGHT,
    quality: number = OPTIMIZE_QUALITY
  ): Promise<any> {
    // Read image from buffer
    const imageOptimized = await Jimp.read(imageBuffer);
    // Resize image
    imageOptimized.resize(width, height);
    // Lower/Upgrade quality of image
    imageOptimized.quality(quality);
  
    const buffer = await this.getJIMPImageBuffer(imageOptimized);
  
    return buffer;
  }
}
