import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, UpdateTaskDto } from './dtos';
import { Task, TaskDocument } from './schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newTask = new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const task = await this.findOne(id);
    if (task)
      return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  async delete(id: string): Promise<TaskDocument> {
    const task = await this.findOne(id);
    if (task) return this.taskModel.findByIdAndDelete(id);
  }
}
