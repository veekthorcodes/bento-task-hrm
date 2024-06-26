import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enums';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Task 1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'This is the first task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: TaskStatus.OPEN,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
