import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TaskStatus } from '../enums';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: TaskStatus, default: 'OPEN' })
  status: string;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
