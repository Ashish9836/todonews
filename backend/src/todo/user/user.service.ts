import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.username = createUserDto.username;
    user.name = createUserDto.name;
    user.phone_number = createUserDto.phone_number;
    user.password = createUserDto.password;
    async function validateEntity(entity: any) {
      const errors = await validate(entity);
      if (errors.length > 0) {
        console.log(errors,"checking for errors")
        return false;
      } else {
        return true;
      }
    }
    const isvalidated = await validateEntity(user);
    if (!isvalidated) throw new Error('Invalid User registration details');
   
    const bcrypt_hash = await bcrypt.hash(user.password, 10);
    user.password = bcrypt_hash;
    const userCreated = await this.userRepository.save(user);
    return {
      data: userCreated,
      message: 'User created successfully',
      status: 201,
    };
  }

  async findOne(username:string){
    const user = await this.userRepository.findOne({where:{username:username}});
    return user;
  }

}
