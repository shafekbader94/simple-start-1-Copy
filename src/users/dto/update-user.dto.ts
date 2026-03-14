import { IsBoolean, IsEmail, IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(100)
	firstName?: string;

	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(100)
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsInt()
	@IsPositive()
	age?: number;

	@IsOptional()
	@IsBoolean()
	isActive?: boolean;
}
