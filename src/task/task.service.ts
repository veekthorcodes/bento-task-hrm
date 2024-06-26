import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dtos';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find();
  }

  async findOne(id: string): Promise<TaskDocument> {
    return this.taskModel.findById(id);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async delete(id: string): Promise<TaskDocument> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskModel.findByIdAndDelete(id);
  }
}
