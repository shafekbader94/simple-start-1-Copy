import { IsString, IsInt } from 'class-validator';

export class CreateTableDTO {
  @IsString()  // Ensures that name is a string
  name: string;

  @IsInt()     // Ensures that seats is an integer
  seats: number;
}
