import { Email } from '@/entities/email/model'
import { EventWithRelations } from '@/entities/event/model'
import { Widget } from '@/entities/widget/model'

export interface CompanyWithEvents {
	id: string
	email: string
	name: string
	password: string
	events: EventWithRelations[]
	widget?: Widget
	emailHtml?: Email
}
