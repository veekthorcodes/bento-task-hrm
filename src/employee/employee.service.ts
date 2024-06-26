import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dtos';
import { Employee, EmployeeDocument } from './schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    try {
      return this.employeeModel.create(createEmployeeDto);
    } catch (error) {
      console.log('codes error');
      return;
      if (error.code === 11000) {
        throw new HttpException('Email already exists', 400);
      }
      throw new HttpException('Something went wrong [service]', 500);
    }
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find();
  }

  async findOne(id: string): Promise<EmployeeDocument> {
    return this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const employee = this.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<EmployeeDocument> {
    const employee = this.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return this.employeeModel.findByIdAndDelete(id);
  }
}
