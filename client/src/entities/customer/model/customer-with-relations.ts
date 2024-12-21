import { Appointment } from '@/entities/appointment/model'
import { Customer } from './customer'

export interface CustomerWithRelations extends Customer {
	appointment: Appointment
}
