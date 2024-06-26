import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enums';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    required: false,
    default: TaskStatus.OPEN,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
