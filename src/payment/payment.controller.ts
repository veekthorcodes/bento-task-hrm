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
import { PaymentService } from './payment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto, UpdatePaymentDto } from './dtos';
import { PaymentDocument } from './schema';
import { PaymentStatus } from './enums';

@ApiTags('payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiResponse({ status: 201, description: 'Payment created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.create(createPaymentDto);
  }

  @ApiResponse({ status: 200, description: 'Payments retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Get()
  async findAll(
    @Query('employeeId') employeeId: string,
  ): Promise<PaymentDocument[]> {
    return await this.paymentService.findAll(employeeId);
  }

  @ApiResponse({ status: 200, description: 'Payment retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentDocument> {
    return await this.paymentService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'Payment updated successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() { status }: UpdatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.update(id, status);
  }

  @ApiResponse({ status: 204, description: 'Payment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Payment not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PaymentDocument> {
    return await this.paymentService.delete(id);
  }
}
