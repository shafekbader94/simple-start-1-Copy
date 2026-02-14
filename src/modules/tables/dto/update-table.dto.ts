import { IsString, IsOptional, IsInt } from 'class-validator';  // Import IsInt

export class UpdateTableDTO {
  @IsOptional()  // Marks name as optional
  @IsString()    // Ensures that name, if provided, is a string
  name?: string;

  @IsOptional()  // Marks seats as optional (if you want to allow updating seats)
  @IsInt()       // Ensures seats is an integer if provided
  seats?: number;
}
