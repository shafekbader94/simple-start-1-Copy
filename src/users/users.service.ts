import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';  // Add the DTO for validation
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Existing method for fetching all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // New method to find user by ID
  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Method for updating a user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      //throw new Error('User not found');
      throw new NotFoundException('User not found');  // Use NestJS's built-in exception
    }

    Object.assign(user, updateUserDto); // Merge existing user with the new data
    return this.userRepository.save(user);  // save updatedd user
  }

  // Existing method for creating a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);  // remove the user from db
  }

}
