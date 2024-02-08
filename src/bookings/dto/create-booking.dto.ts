import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'The start time of the booking',
  })
  startDateTime: Date;

  @ApiProperty({
    description: 'The end time of the booking',
  })
  endDateTime: Date;

  @ApiProperty({
    description: 'The parking spot that is being booked',
  })
  parkingSpot: string;
}
