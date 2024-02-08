import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ParkingSpot } from 'src/parking-spots/entities/parking-spot.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  create(
    createBookingDto: CreateBookingDto,
    user: User,
    parkingSpot: ParkingSpot,
  ): Promise<Booking> {
    const booking: Booking = new Booking();
    booking.startDateTime = createBookingDto.startDateTime;
    booking.endDateTime = createBookingDto.endDateTime;
    booking.createdByUser = user;
    booking.parkingSpot = parkingSpot;
    return this.bookingRepository.save(booking);
  }

  async findAll(user: User): Promise<Booking[]> {
    if (user.role === 'admin') {
      return this.bookingRepository.find({
        relations: ['parkingSpot', 'createdByUser'],
      });
    } else {
      return this.bookingRepository.find({
        where: { createdByUser: user },
        relations: ['parkingSpot', 'createdByUser'],
      });
    }
  }

  findOne(id: string, user: User) {
    if (user.role === 'admin') {
      return this.bookingRepository.findOne({
        where: { id },
        relations: ['parkingSpot', 'createdByUser'],
      });
    } else {
      return this.bookingRepository.findOne({
        where: { createdByUser: user, id },
        relations: ['parkingSpot', 'createdByUser'],
      });
    }
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
    user: User,
    parkingSpot?: ParkingSpot,
  ): Promise<Booking> {
    const booking = await this.findOne(id, user);
    if (!booking) throw new NotFoundException();
    this.validateStartEndDateTime({
      ...(booking.startDateTime && {
        startDateTime: booking.startDateTime,
      }),
      ...(booking.endDateTime && {
        endDateTime: booking.endDateTime,
      }),
      ...(updateBookingDto.startDateTime && {
        startDateTime: updateBookingDto.startDateTime,
      }),
      ...(updateBookingDto.endDateTime && {
        endDateTime: updateBookingDto.endDateTime,
      }),
    });

    await this.bookingRepository.update(id, {
      ...(updateBookingDto.startDateTime && {
        startDateTime: updateBookingDto.startDateTime,
      }),
      ...(updateBookingDto.endDateTime && {
        endDateTime: updateBookingDto.endDateTime,
      }),
      ...(parkingSpot && {
        parkingSpot,
      }),
    });

    return this.findOne(id, user);
  }

  async remove(id: string, user: User) {
    if (user.role === 'admin') {
      await this.bookingRepository.delete(id);
    } else {
      await this.bookingRepository.delete({ id, createdByUser: user });
    }
  }

  validateStartEndDateTime({
    startDateTime,
    endDateTime,
  }: {
    startDateTime: Date;
    endDateTime: Date;
  }) {
    if (new Date(startDateTime) > new Date(endDateTime)) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Start date time must be before End date time',
        error: 'Bad request',
      });
    }
  }
}
