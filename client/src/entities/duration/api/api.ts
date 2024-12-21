import { getMainInstance } from '@/shared/api'
import { Duration } from '../model'

export interface CreateDurationPayload extends Omit<Duration, 'id'> {}
export interface CreateDurationResponse extends Duration {}

export interface DeleteDurationResponse extends Duration {}

export class DurationApi {
	static async createDuration(payload: CreateDurationPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateDurationResponse>(
			'/durations',
			payload
		)
		return data
	}

	static async deleteDuration(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteDurationResponse>(
			`/durations/${id}`
		)
		return data
	}
}
