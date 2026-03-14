import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';


export class CreateUserDto {
//first name 1–100 characters
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

 //last name 1–100 characters
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  //unique email address
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // age optional, positive integer.
  @IsOptional()
  @IsInt()
  @IsPositive()
  age?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
