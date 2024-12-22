import { IsNotEmpty } from 'class-validator';
import { CreateDurationDto } from '../../durations/dto/create-duration.dto';

export class CreateAppointmentDto {
  @IsNotEmpty()
  date: Date | string;

  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  duration: CreateDurationDto;

  timeId?: string;
  weekDay?: number;
  customerId?: string;
}
