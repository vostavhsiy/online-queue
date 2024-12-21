import { CreateSchedulePayload } from '@/entities/schedule/api'
import { getMainInstance } from '@/shared/api'
import { Event, EventWithRelations } from '../model'

export interface CreateEventPayload extends Pick<Event, 'name'> {
	schedule?: Omit<CreateSchedulePayload, 'eventId'>
}
export interface CreateEventResponse extends Event {}

export type GetAllEventsResponse = EventWithRelations[]

export interface GetEventResponse extends EventWithRelations {}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {}
export interface UpdateEventResponse extends Event {}

export interface DeleteEventResponse extends Event {}

export class EventApi {
	static async createEvent(payload: CreateEventPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateEventResponse>(
			'/events',
			payload
		)
		return data
	}

	static async getAll() {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetAllEventsResponse>('/events')
		return data
	}

	static async getOne(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetEventResponse>(`/events/${id}`)
		return data
	}

	static async updateEvent(id: string, payload: UpdateEventPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateEventResponse>(
			`/events/${id}`,
			payload
		)
		return data
	}

	static async deleteEvent(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteEventResponse>(`/events/${id}`)
		return data
	}
}
