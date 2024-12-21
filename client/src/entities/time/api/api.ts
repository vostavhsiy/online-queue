import { CreateAppointmentPayload } from '@/entities/appointment/api'
import { CreateDurationPayload } from '@/entities/duration/api'
import { getMainInstance } from '@/shared/api'
import { Time } from '../model'

export interface CreateTimePayload extends Omit<Time, 'id'> {
	eventId: string
	times: CreateDurationPayload[]
	appointments?: CreateAppointmentPayload[]
}
export interface CreateTimeResponse extends Time {}

export interface UpdateTimePayload extends Partial<CreateTimePayload> {}
export interface UpdateTimeResponse extends Time {}

export interface DeleteTimeResponse extends Time {}

export class TimeApi {
	static async createTime(payload: CreateTimePayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateTimeResponse>('/times', payload)
		return data
	}

	static async updateTime(id: string, payload: UpdateTimePayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateTimeResponse>(
			`/times/${id}`,
			payload
		)
		return data
	}

	static async deleteTime(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteTimeResponse>(`/times/${id}`)
		return data
	}
}
