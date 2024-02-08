import { Injectable } from '@nestjs/common';
import { ParkingSpot } from './entities/parking-spot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ParkingSpotsService {
  constructor(
    @InjectRepository(ParkingSpot)
    private parkingSpotRepository: Repository<ParkingSpot>,
  ) {}

  findOne(id: string): Promise<ParkingSpot> {
    return this.parkingSpotRepository.findOneBy({ id });
  }
}
