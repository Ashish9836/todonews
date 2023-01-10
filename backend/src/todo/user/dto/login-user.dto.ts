import { Contains, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @Length(8, 30, { message: 'Name should be between 8 to 30 characters' })
  @Contains('@')
  username: string;
  @Length(8, 30, { message: 'Name should be between 2 to 30 characters' })
  password: string;
}
