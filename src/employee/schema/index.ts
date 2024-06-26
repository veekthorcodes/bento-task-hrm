import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  department: string;

  @Prop({
    required: true,
    validate: {
      validator: (date: Date) => date.getTime() <= Date.now(),
      message: 'Hire date cannot be in the future',
    },
  })
  hireDate: Date;

  @Prop({ required: true })
  salary: number;

  @Prop({ default: false, select: false })
  isDeleted: boolean;
}

export type EmployeeDocument = Employee & Document;
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
