import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UsersService } from 'src/users/users.service';
import { ParkingSpotsService } from 'src/parking-spots/parking-spots.service';
import { Booking } from './entities/booking.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { TokenGuard } from './bookings.guard';
import { AuthorizationToken } from './token.decorator';

@ApiTags('bookings')
@Controller('bookings')
@ApiSecurity('x-api-key')
@UseGuards(TokenGuard)
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly usersService: UsersService,
    private readonly parkingSpotsService: ParkingSpotsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The booking has been successfully created.',
    type: Booking,
  })
  async create(
    @Body() createBookingDto: CreateBookingDto,
    @AuthorizationToken() token: string,
  ): Promise<Booking> {
    const user = await this.usersService.findByToken(token).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new ForbiddenException();
    const parkingSpot = await this.parkingSpotsService.findOne(
      createBookingDto.parkingSpot,
    );
    if (!parkingSpot) throw new NotFoundException();
    return this.bookingsService.create(createBookingDto, user, parkingSpot);
  }

  @Get()
  @ApiOkResponse({
    description: 'The list of bookings for authenticated user',
    type: [Booking],
  })
  async findAll(@AuthorizationToken() token: string): Promise<Booking[]> {
    const user = await this.usersService.findByToken(token).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new ForbiddenException();
    return this.bookingsService.findAll(user);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The booking details by id',
    type: Booking,
  })
  async findOne(
    @AuthorizationToken() token: string,
    @Param('id') id: string,
  ): Promise<Booking> {
    const user = await this.usersService.findByToken(token).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new ForbiddenException();
    const booking = await this.bookingsService.findOne(id, user);
    if (!booking) throw new NotFoundException();
    return booking;
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The booking has been successfully updated',
  })
  @ApiBadRequestResponse({
    description: 'Invalid booking update request',
  })
  async update(
    @AuthorizationToken() token: string,
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ): Promise<Booking> {
    const user = await this.usersService.findByToken(token).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new ForbiddenException();

    let parkingSpot;
    if (updateBookingDto.parkingSpot) {
      parkingSpot = await this.parkingSpotsService.findOne(
        updateBookingDto.parkingSpot,
      );
    }
    return this.bookingsService.update(id, updateBookingDto, user, parkingSpot);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The booking has been deleted',
  })
  async remove(@AuthorizationToken() token: string, @Param('id') id: string) {
    const user = await this.usersService.findByToken(token).catch(() => {
      throw new ForbiddenException();
    });
    if (!user) throw new ForbiddenException();
    return this.bookingsService.remove(id, user);
  }
}
