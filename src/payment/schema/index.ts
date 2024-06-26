import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentStatus } from '../enums';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Payment {
  @Prop({
    required: true,
    type: SchemaTypes.ObjectId,
    ref: 'Employee',
  })
  employeeId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, default: Date.now() })
  date: Date;

  @Prop({ enum: PaymentStatus, default: 'PENDING' })
  status: string;
}

export type PaymentDocument = Payment & Document;
export const PaymentSchema = SchemaFactory.createForClass(Payment);
