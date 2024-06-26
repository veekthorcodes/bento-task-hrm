import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return this.taskService.create(createTaskDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'The tasks has been successfully retrieved.',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The task has been successfully retrieved.',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @ApiResponse({
    status: 204,
    description: 'The task has been successfully deleted.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
