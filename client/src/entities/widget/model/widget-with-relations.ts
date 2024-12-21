import { Company } from '@/entities/company/model'
import { Widget } from './widget'

export interface WidgetWithRelations extends Widget {
	company: Company
}
