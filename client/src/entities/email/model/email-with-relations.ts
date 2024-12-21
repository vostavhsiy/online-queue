import { Company } from '@/entities/company/model'
import { Email } from './email'

export interface EmailWithRelations extends Email {
	company: Company
}
