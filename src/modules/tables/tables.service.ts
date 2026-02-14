import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableEntity } from './table.entity';
import { CreateTableDTO } from './dto/create-table.dto';
import { UpdateTableDTO } from './dto/update-table.dto';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async getAll(): Promise<TableEntity[]> {
    return this.tableRepository.find();  // Fetch all tables
  }

async getOne(id: number): Promise<TableEntity | null> {
  return this.tableRepository.findOne({
    where: { id },
  });
}

  async create(table: CreateTableDTO): Promise<TableEntity> {
    const newTable = this.tableRepository.create(table);  // Create a new entity from DTO
    return await this.tableRepository.save(newTable);     // Save to DB
  }

  async update(id: number, table: UpdateTableDTO): Promise<TableEntity> {
    const existingTable = await this.tableRepository.findOne({
      where: { id },
    });
    if (!existingTable) {
      throw new Error('Table not found');
    }
    // Apply updates from DTO
    Object.assign(existingTable, table);
    return this.tableRepository.save(existingTable);  // Save the updated table
  }

  async delete(id: number): Promise<void> {
    await this.tableRepository.delete(id);  // Delete the table by ID
  }
}
