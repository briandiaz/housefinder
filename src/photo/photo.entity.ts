import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { PhotoStatusEnum } from "./enums/photo-status.enum";
import { ListingEntity } from "../listing/listing.entity";
import { generateImageFileName } from "../listing/utils/file";
import { PhotoRO } from "./interfaces/photo-ro.interface";

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @Column({ type: 'varchar', nullable: false, default: PhotoStatusEnum.IN_PROGRESS })
  status: PhotoStatusEnum;

  @Column({ type: 'varchar', nullable: false, name: 'file_name' })
  fileName: string;

  @Column({ type: 'varchar', nullable: false, name: 'listing_id' })
  listingId: string;

  @ManyToOne(() => ListingEntity, listing => listing.photos)
  @JoinColumn({ name: 'listing_id' })
  listing: ListingEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  public static fromFile(file: any, listing: ListingEntity): PhotoEntity {
    const photo = new PhotoEntity();
    photo.fileName = generateImageFileName(file);
    photo.status = PhotoStatusEnum.IN_PROGRESS;
    photo.listing = listing;

    return photo;
  }

  public static toRO(photo): PhotoRO {
    return {
      id: photo.id,
      status: photo.status,
      url: photo.url,
      fileName: photo.fileName,
      listingId: photo.listing.id,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    };
  }
}
