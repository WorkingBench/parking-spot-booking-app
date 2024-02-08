import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ParkingSpot } from '../../parking-spots/entities/parking-spot.entity';

@Entity()
export class Booking {
  @ApiProperty({ description: 'The auto-generated id of the booking' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The user who created this booking' })
  @ManyToOne(() => User)
  createdByUser: User;

  @ApiProperty({ description: 'The start date and time of the booking' })
  @Column()
  startDateTime: Date;

  @ApiProperty({ description: 'The end date and time of the booking' })
  @Column()
  endDateTime: Date;

  @ApiProperty({ description: 'The parking spot booked' })
  @ManyToOne(() => ParkingSpot)
  parkingSpot: ParkingSpot;

  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when booking was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
