import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
