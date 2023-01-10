import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Contains, IsEmail, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 30, { message: 'Name should be between 2 to 30 characters' })
  name: string;

  @Column()
  @Length(4, 30, { message: 'Name should be between 8 to 30 characters' })
  @Contains('@')
  username: string;

  @Column()
  phone_number: string;

  @Column()
  @Length(8, 30, { message: 'Name should be between 2 to 30 characters' })
  password: string;
}
