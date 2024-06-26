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
import { EmployeeService } from './employee.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dtos';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiResponse({
    status: 201,
    description: 'The employee has been successfully created.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      return this.employeeService.create(createEmployeeDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email already exists ctrl', 400);
      }
      throw new HttpException('Something went wrong', 500);
    }
  }

  @ApiResponse({
    status: 200,
    description: 'The employees has been successfully retrieved.',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully retrieved.',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The employee has been successfully updated.',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      return this.employeeService.update(id, updateEmployeeDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @ApiResponse({
    status: 204,
    description: 'The employee has been successfully removed.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
