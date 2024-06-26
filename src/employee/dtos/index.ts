import { PartialType } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsDateString()
  hireDate: Date;

  @IsNotEmpty()
  @IsNumber()
  salary: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
