import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateTableDTO } from './dto/create-table.dto';
import { UpdateTableDTO } from './dto/update-table.dto';
import { TablesService } from './tables.service';
import { TableEntity } from './table.entity';  // Add this import to use TableEntity in the controller


@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get()
  async getAll(): Promise<TableEntity[]> {
    return this.tablesService.getAll();
  }

 @Get(':id')
async getOne(@Param('id') id: number): Promise<TableEntity | null> {
  return this.tablesService.getOne(id);  // Expect TableEntity or null
}


  @Post()
  async create(@Body() table: CreateTableDTO): Promise<TableEntity> {
    return this.tablesService.create(table);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() table: UpdateTableDTO,
  ): Promise<TableEntity> {
    return this.tablesService.update(id, table);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.tablesService.delete(id);
  }
}