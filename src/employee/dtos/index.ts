import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'The name of the employee',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of the employee',
    example: 'jdoe@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The position of the employee',
    example: 'Software Engineer',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'The department of the employee',
    example: 'Engineering',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({
    description: 'The hire date of the employee',
    example: '2024-06-26T21:30:38.294Z',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  hireDate: Date;

  @ApiProperty({
    description: 'The salary of the employee',
    example: 50000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  salary: number;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
