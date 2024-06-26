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

  // Create a task record
  async create(createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    return this.taskModel.create(createTaskDto);
  }

  // Retrieve all task records
  async findAll(): Promise<TaskDocument[]> {
    return this.taskModel.find({
      isDeleted: { $ne: true },
    });
  }

  // Retrieve a task record by ID
  async findOne(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  // Update a task record by ID
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const task = await this.taskModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }

  // Delete a task record by ID
  async delete(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.isDeleted = true;
    return task.save();
  }
}
