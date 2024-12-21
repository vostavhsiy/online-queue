import { Event } from '@/entities/event/model'
import { TimeWithRelations } from '@/entities/time/model'
import { Schedule } from './schedule'

export interface ScheduleWithRelations extends Schedule {
	event: Event
	times: TimeWithRelations[]
}
