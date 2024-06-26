import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schema';
import { TaskController } from './task.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
