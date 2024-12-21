import { Appointment } from '@/entities/appointment/model'
import { Time } from '@/entities/time/model'
import { Duration } from './duration'

export interface DurationWithRelations extends Duration {
	appointments: Appointment[]
	times: Time[]
}
