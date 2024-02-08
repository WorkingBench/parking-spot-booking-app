import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { ParkingSpotsService } from 'src/parking-spots/parking-spots.service';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    UsersModule,
    ParkingSpotsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService, UsersService, ParkingSpotsService],
})
export class BookingsModule {}
