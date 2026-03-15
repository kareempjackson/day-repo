import { IsEnum } from 'class-validator';

export enum PaymentTypeDto {
  CASH = 'CASH',
  CARD = 'CARD',
}

export class PayOrderDto {
  @IsEnum(PaymentTypeDto)
  payment_type: PaymentTypeDto;
}
