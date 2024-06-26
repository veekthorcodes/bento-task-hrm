import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeService } from 'src/employee/employee.service';
import { CreatePaymentDto } from './dtos';
import { Payment, PaymentDocument } from './schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly employeeService: EmployeeService,
  ) {}

  // Create a new payment
  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDocument> {
    const { employeeId } = createPaymentDto;
    const employee = await this.employeeService.findByQuery({
      _id: employeeId,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return await this.paymentModel.create(createPaymentDto);
  }

  // Find all payments for an employee
  async findAll(employeeId: string): Promise<PaymentDocument[]> {
    const employee = await this.employeeService.findByQuery({
      _id: employeeId,
      isDeleted: { $ne: true },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return this.paymentModel.find({
      employeeId: { $eq: employeeId },
      isDeleted: { $ne: true },
    });
  }

  // Update employee payment status
  async update(
    employeeId: string,
    id: string,
    status: string,
  ): Promise<PaymentDocument> {
    const employee = await this.employeeService.findByQuery({
      _id: employeeId,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const payment = await this.paymentModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.paymentModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
        },
      },
      { new: true },
    );
  }

  // Delete a payment
  async delete(employeeId: string, id: string): Promise<PaymentDocument> {
    const employee = await this.employeeService.findByQuery({
      _id: employeeId,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    const payment = await this.paymentModel.findById({
      _id: id,
      isDeleted: { $ne: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    payment.isDeleted = true;
    return payment.save();
  }
}
