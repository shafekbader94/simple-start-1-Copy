import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'; // Import User entity
import { AiModule } from './ai/ai.module';
import { TablesModule } from './modules/tables/tables.module';
import { TableEntity } from './modules/tables/table.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/dev.db', // Adjust this path if necessary
      entities: [User, TableEntity],  // Make sure User and Table are here
      synchronize: true,  // For auto-syncing entities (dev only)
    }),
    UsersModule,
    AiModule,
    TablesModule
  ],
})
export class AppModule {}
