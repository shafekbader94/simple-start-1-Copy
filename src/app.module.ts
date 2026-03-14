
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';


@Module({
imports: [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,       // e.g., mysql-service
    port: +process.env.DB_PORT,      // convert string to number
    username: process.env.DB_USER,   
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    synchronize: true, // only for dev
  }),
    UsersModule,
  ],
})
export class AppModule {}
