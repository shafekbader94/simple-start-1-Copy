import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TableEntity } from './table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  controllers: [TablesController],
  providers: [TablesService],
})
export class TablesModule {}
