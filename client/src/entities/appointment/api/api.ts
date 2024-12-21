import { CreateDurationPayload } from '@/entities/duration/api'
import { Event } from '@/entities/event/model'
import { getMainInstance } from '@/shared/api'
import { Appointment } from '../model'

export interface CreateAppointmentPayload
	extends Omit<Partial<Appointment>, 'id'> {
	duration: CreateDurationPayload
}
export interface CreateAppointmentResponse extends Appointment {
	event: Event
}

export interface GetAppointmentResponse extends Appointment {}

export interface UpdateAppointmentPayload
	extends Partial<CreateAppointmentPayload> {}
export interface UpdateAppointmentResponse extends Appointment {}

export interface DeleteAppointmentResponse extends Appointment {}

export class AppointmentApi {
	static async createAppointment(payload: CreateAppointmentPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateAppointmentResponse>(
			'/appointments',
			payload
		)
		return data
	}

	static async getOne(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetAppointmentResponse>(
			`/appointments/${id}`
		)
		return data
	}

	static async updateAppointment(
		id: string,
		payload: UpdateAppointmentPayload
	) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateAppointmentResponse>(
			`/appointments/${id}`,
			payload
		)
		return data
	}

	static async deleteAppointment(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteAppointmentResponse>(
			`/appointments/${id}`
		)
		return data
	}
}
