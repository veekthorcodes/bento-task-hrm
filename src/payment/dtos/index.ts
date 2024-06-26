import { PartialType } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentStatus } from '../enums';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status: string;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
