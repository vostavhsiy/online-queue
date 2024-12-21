import { AppointmentWithRelations } from '@/entities/appointment/model'
import { Company } from '@/entities/company/model'
import { ScheduleWithRelations } from '@/entities/schedule/model'

export interface EventWithRelations {
	id: string
	name: string
	companyId: string
	company: Company
	schedule?: ScheduleWithRelations
	appointments: AppointmentWithRelations[]
}
