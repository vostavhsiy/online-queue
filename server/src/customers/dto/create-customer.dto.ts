import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsMobilePhone()
  phone: string;

  @IsNotEmpty()
  appointmentId: string;

  info?: {
    id: string;
    title: string;
    date: string;
    time: {
      from: string;
      to: string;
    };
  };
}
