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

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.create(createPaymentDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(
    @Query('employeeId') employeeId: string,
  ): Promise<PaymentDocument[]> {
    return await this.paymentService.findAll(employeeId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PaymentDocument> {
    return await this.paymentService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body() { status }: UpdatePaymentDto,
  ): Promise<PaymentDocument> {
    return await this.paymentService.update(id, status);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<PaymentDocument> {
    return await this.paymentService.delete(id);
  }
}
