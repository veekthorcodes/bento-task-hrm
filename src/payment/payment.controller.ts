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
  Query,
} from '@nestjs/common';
import { CreatePaymentDto, UpdatePaymentDto } from './dtos';
import { PaymentService } from './payment.service';
import { PaymentDocument } from './schema';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Create a new payment
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Payment created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.create(createPaymentDto);
  }

  // Retrieve all payments
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ' All payments retrieved sucessfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query('employeeId') employeeId: string,
  ): Promise<PaymentDocument[]> {
    return await this.paymentService.findAll(employeeId);
  }

  // Update a payment by ID
  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Payment updated sucessfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Query('employeeId') employeeId: string,
    @Body() { status }: UpdatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.update(employeeId, id, status);
  }

  // Delete a payment by ID
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Payment deleted sucessfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Query('employeeId') employeeId: string,
  ): Promise<PaymentDocument> {
    return await this.paymentService.delete(employeeId, id);
  }
}
