import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schema';
import { Model } from 'mongoose';
import { CreatePaymentDto, UpdatePaymentDto } from './dtos';
import { EmployeeService } from 'src/employee/employee.service';
import { PaymentStatus } from './enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly employeeService: EmployeeService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDocument> {
    const { employeeId } = createPaymentDto;
    const employee = await this.employeeService.findOne(employeeId);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return await this.paymentModel.create(createPaymentDto);
  }

  async findAll(employeeId: string): Promise<PaymentDocument[]> {
    return this.paymentModel.find({
      employeeId: { $eq: employeeId },
    });
  }

  async findOne(id: string): Promise<PaymentDocument> {
    const payment = await this.paymentModel.findById(id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async update(id: string, status: string): Promise<PaymentDocument> {
    const payment = await this.findOne(id);
    if (payment)
      return this.paymentModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              status,
            },
          },
          { new: true },
        )
        .exec();
  }

  async delete(id: string): Promise<PaymentDocument> {
    const payment = await this.findOne(id);
    if (payment) return this.paymentModel.findByIdAndDelete(id).exec();
  }
}
