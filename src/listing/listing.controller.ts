import { ApiOperation, ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Post, Body, ValidationPipe, UseGuards, UsePipes, Get, UseInterceptors, Param, UploadedFile } from '@nestjs/common';
import { ListingDTO } from './dtos/listing.dto';
import { GetUser } from '../authentication/decorators/get-user.decorator';
import { UserEntity } from '../authentication/user.entity';
import { ListingEntity } from './listing.entity';
import { ListingService } from './listing.service';
import { ListingValidation } from './pipe/listing-validation.pipe';
import { PhotoRO } from '../photo/interfaces/photo-ro.interface';
import { imageFileFilter } from './utils/file';
import { ListingRO } from './interfaces/listing.interface';

@ApiTags('listings')
@Controller('listings')
export class ListingController {
  constructor(
    private readonly listingService: ListingService,
  ) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all listings.' })
  @ApiResponse({ status: 200, description: 'Return all listings.'})
  async getAllListings(): Promise<Array<ListingEntity>> {
    return await this.listingService.getAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a listing by ID.' })
  @ApiResponse({ status: 200, description: 'Return a listing.'})
  @ApiResponse({ status: 404, description: 'Listing not found.'})
  async getListinByID(
    @Param('id') id: string,
  ): Promise<ListingEntity> {
    return await this.listingService.getById(id);
  }

  @Post('/')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create listing' })
  @ApiResponse({ status: 201, description: 'The listing has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe, ListingValidation)
  async createListing(
    @Body() listingDTO: ListingDTO,
    @GetUser() user: UserEntity
  ): Promise<ListingRO> {
    return await this.listingService.create(listingDTO, user);
  }

  @Post('/:id/photos')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add photos to listing' })
  @ApiResponse({ status: 201, description: 'The photo has been added to listing successfully.'})
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Listing not found.'})
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: imageFileFilter,
    }),
  )
  async addPhotoToListing(
    @Param('id') listingId: string,
    @UploadedFile() file: any
  ): Promise<PhotoRO> {
    return await this.listingService.addPhoto(listingId, file);
  }
}
