import { CreateTimePayload } from '@/entities/time/api'
import { getMainInstance } from '@/shared/api'
import { Schedule } from '../model'

export interface CreateSchedulePayload extends Pick<Schedule, 'eventId'> {
	times: Array<Omit<CreateTimePayload, 'scheduleId' | 'eventId'>>
}
export interface CreateScheduleResponse extends Schedule {}

export interface UpdateSchedulePayload extends Partial<CreateSchedulePayload> {}
export interface UpdateScheduleResponse extends Schedule {}

export interface DeleteScheduleResponse extends Schedule {}

export class ScheduleApi {
	static async createSchedule(payload: CreateSchedulePayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateScheduleResponse>(
			'/schedules',
			payload
		)
		return data
	}

	static async updateSchedule(id: string, payload: UpdateSchedulePayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateScheduleResponse>(
			`/schedules/${id}`,
			payload
		)
		return data
	}

	static async deleteSchedule(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteScheduleResponse>(
			`/schedules/${id}`
		)
		return data
	}
}
