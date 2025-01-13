import { getMainInstance } from '@/shared/api'
import { Widget } from '../model'

export type GetWidgetResponse = { html: string; url: string }

export interface CreateWidgetPayload extends Omit<Widget, 'id'> {}
export interface CreateWidgetResponse extends Widget {}

export interface UpdateWidgetPayload extends Partial<CreateWidgetPayload> {}
export interface UpdateWidgetResponse extends Widget {}

export interface DeleteWidgetResponse extends Widget {}

export class WidgetApi {
	static async getWidget(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetWidgetResponse>(`/widgets/${id}`)
		return data
	}

	static async createWidget(payload: CreateWidgetPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateWidgetResponse>(
			'/widgets',
			payload
		)
		return data
	}

	static async updateWidget(id: string, payload: UpdateWidgetPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateWidgetResponse>(
			`/widgets/${id}`,
			payload
		)
		return data
	}

	static async deleteWidget(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteWidgetResponse>(
			`/widgets/${id}`
		)
		return data
	}
}
