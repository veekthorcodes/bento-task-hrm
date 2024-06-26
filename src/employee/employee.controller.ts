import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dtos';
import { EmployeeService } from './employee.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //  Create an employee record
  @ApiOperation({ summary: 'Create an employee record' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The employee record has been successfully created.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already in use.',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  // Retrieve all employee records
  @ApiOperation({ summary: 'Retrieve all employee records' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The employee records have been successfully retrieved.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  // Retrieve an employee record by ID
  @ApiOperation({ summary: 'Retrieve an employee record by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The employee record has been successfully retrieved.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  // Update an employee record by ID
  @ApiOperation({ summary: 'Update an employee record by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The employee record has been successfully updated.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  // Delete an employee record by ID
  @ApiOperation({ summary: 'Delete an employee record by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The employee record has been successfully deleted.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
