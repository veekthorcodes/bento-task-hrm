import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dtos';
import { Employee, EmployeeDocument } from './schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  // Create an employee record
  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const { email } = createEmployeeDto;
    const employeeExists = await this.employeeModel.findOne({
      email: { $eq: email },
      isDeleted: { $ne: true },
    });
    if (employeeExists) {
      throw new ConflictException('Employee already exists');
    }
    return this.employeeModel.create(createEmployeeDto);
  }

  // Find all employees by query
  async findByQuery(
    query: FilterQuery<EmployeeDocument>,
  ): Promise<EmployeeDocument[]> {
    return this.employeeModel.findOne({
      ...query,
      isDeleted: { $ne: true },
    });
  }

  // Retrieve all employee records
  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find({
      isDeleted: { $ne: true },
    });
  }

  // Retrieve an employee record by ID
  async findOne(id: string): Promise<EmployeeDocument> {
    const employee = await this.employeeModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  // Update an employee record by ID
  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const employee = await this.employeeModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, {
      new: true,
    });
  }

  // Delete an employee record by ID
  async delete(id: string): Promise<EmployeeDocument> {
    const employee = await this.employeeModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    employee.isDeleted = true;
    employee.email = `${employee.email}-deleted-${Date.now()}`;
    return employee.save();
  }
}
