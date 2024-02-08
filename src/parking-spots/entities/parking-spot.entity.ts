import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ParkingSpot {
  @ApiProperty({ description: 'The auto-generated id of the parking spot' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the parking spot' })
  @Column()
  name: string;
}
