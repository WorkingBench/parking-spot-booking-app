import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    BookingsModule,
    ParkingSpotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
