import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity'; // Import User entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity here
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService if needed
})
export class UsersModule {}
