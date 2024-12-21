import { Customer } from '@/entities/customer/model'
import { Duration } from '@/entities/duration/model'
import { Event } from '@/entities/event/model'
import { Time } from '@/entities/time/model'
import { Appointment } from './appointment'

export interface AppointmentWithRelations extends Appointment {
	event: Event
	time?: Time
	duration: Duration
	customer?: Customer
}
