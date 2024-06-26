import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://testuser:testpassword@main.87lc93s.mongodb.net/bento_test_db?retryWrites=true&w=majority&appName=main',
    ),
    TaskModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
    AppService,
  ],
})
export class AppModule {}
