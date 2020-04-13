import { BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, Entity, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, ManyToMany, JoinTable } from "typeorm";
import { IPoint } from "./interfaces/IPoint";
import { ListingTypeEnum } from "./enums/listing-type.enum";
import { UserEntity } from "../authentication/user.entity";
import { ListingUnitTypeEnum } from "./enums/listing-unit-type.enum";
import { PhotoEntity } from "../photo/photo.entity";
import { ListingDTO } from "./dtos/listing.dto";
import { ListingRO } from "./interfaces/listing.interface";
import { CONSTRAINTS } from "../config/constants";
import { AmenityEntity } from "../amenity/amenity.entity";

@Entity('listing')
@Unique(
  CONSTRAINTS.UQ_LISTING_NAME.name,
  [CONSTRAINTS.UQ_LISTING_NAME.field],
)
export class ListingEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false, name: 'guest_count' })
  guestCount: number;

  @Column({ type: 'integer', nullable: false, name: 'room_count' })
  roomCount: number;

  @Column({ type: 'integer', nullable: false, name: 'bed_count' })
  bedCount: number;

  @Column({ type: 'decimal', nullable: false, name: 'bathroom_count' })
  bathroomCount: number;

  @Column({ type: 'integer', nullable: true })
  floor: number;

  @Column({
    type: 'point',
    nullable: false,
    transformer: {
      from: point => point,
      to: point => `${point.x || point.latitude}, ${point.y || point.longitude}`,
    },
  })
  coordinates: IPoint;

  @Column({ type: 'integer', nullable: true, name: 'square_feet' })
  squareFeet: number;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  rules: string;

  @Column({ type: 'integer', nullable: true })
  rating: number;

  @Column({ type: 'varchar', name: 'listing_type', nullable: false, enum: ListingTypeEnum })
  listingType: ListingTypeEnum;

  @Column({ type: 'boolean', nullable: true, name: 'is_pet_friendly' })
  isPetFriendly: boolean;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'varchar', nullable: false, name: 'uni_type', enum: ListingUnitTypeEnum })
  unitType: ListingUnitTypeEnum;

  @Column({ type: 'varchar', nullable: false, name: 'host_id' })
  hostId: string;

  @ManyToOne(() => UserEntity, user => user.listings)
  @JoinColumn({ name: 'host_id' })
  host: UserEntity;

  @OneToMany(() => PhotoEntity, photo => photo.listing, { eager: true })
  photos: Array<PhotoEntity>;

  @ManyToMany(() => AmenityEntity)
  @JoinTable()
  amenities: AmenityEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  public static fromDTO(listingDTO: ListingDTO, user: UserEntity): ListingEntity {
    const listing = new ListingEntity();
    listing.name = listingDTO.name;
    listing.bathroomCount = listingDTO.bathroomCount;
    listing.bedCount = listingDTO.bedCount;
    listing.guestCount = listingDTO.guestCount;
    listing.roomCount = listingDTO.roomCount;
    listing.floor = listingDTO.floor;
    listing.coordinates = listingDTO.coordinates;
    listing.squareFeet = listingDTO.squareFeet;
    listing.description = listingDTO.description;
    listing.notes = listingDTO.notes;
    listing.rules = listingDTO.rules;
    listing.rating = listingDTO.rating;
    listing.listingType = listingDTO.listingType;
    listing.isPetFriendly = listingDTO.isPetFriendly;
    listing.price = listingDTO.price;
    listing.unitType = listingDTO.unitType;
    listing.host = user;
    listing.photos = [];
    listing.amenities = [];

    return listing;
  }

  public static toRO(listing: ListingEntity): ListingRO {
    return {
      id: listing.id,
      name: listing.name,
      bathroomCount: listing.bathroomCount,
      bedCount: listing.bedCount,
      coordinates: listing.coordinates,
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      floor: listing.floor,
      squareFeet: listing.squareFeet,
      description: listing.description,
      notes: listing.notes,
      rules: listing.rules,
      rating: listing.rating,
      listingType: listing.listingType,
      isPetFriendly: listing.isPetFriendly,
      price: listing.price,
      unitType: listing.unitType,
      photos: listing.photos,
      hostId: listing.hostId,
    };
  }
}