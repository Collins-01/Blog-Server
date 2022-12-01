import {  Injectable } from '@nestjs/common';
import { CreateEmailUserDto } from './dto/create-email-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon from 'argon2';
import UserRepository from './users.repository';

@Injectable()
export default class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(dto: CreateEmailUserDto) {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.userRepository.createEmailUser({
        ...dto,
        password: hash,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.getUserByID(id);
    return user;
  }
  async findOneByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
