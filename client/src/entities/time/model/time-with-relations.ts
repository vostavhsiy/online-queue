import { AppointmentWithRelations } from '@/entities/appointment/model'
import { Duration } from '@/entities/duration/model'
import { Schedule } from '@/entities/schedule/model'
import { Time } from './time'

export interface TimeWithRelations extends Time {
	schedule: Schedule
	appointments: AppointmentWithRelations[]
	times: Duration[]
}
