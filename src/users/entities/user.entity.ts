import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @ApiProperty({ description: 'The auto-generated id of the user' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The first name of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @Column()
  lastName: string;

  @ApiProperty({ description: 'The email address of the user' })
  @Column()
  email: string;

  @ApiProperty({ enum: ['user', 'admin'], description: 'The role of the user' })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @ApiProperty({ description: 'The unique token assigned to the user' })
  @Column()
  @Generated('uuid')
  token: string;
}
