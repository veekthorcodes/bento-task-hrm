import { ApiProperty, PartialType } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The employee ID',
    example: '667c585dc7ec3ed2fd75b69z',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty({
    description: 'The amount of the payment',
    example: 1000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'The date of the payment',
    example: '2021-06-01',
    required: true,
  })
  @IsOptional()
  @IsDateString()
  date: Date;

  @ApiProperty({
    description: 'The status of the payment',
    example: PaymentStatus.PENDING,
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status: string;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
