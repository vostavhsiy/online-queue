import { getMainInstance } from '@/shared/api'
import { Email } from '../model'

export interface GetEmailResponse extends Email {}
export type GetMakeTemplateResponse = string
export type GetUnmakeTemplateResponse = string

export interface CreateEmailPayload extends Omit<Email, 'id'> {}
export interface CreateEmailResponse extends Email {}

export interface UpdateEmailPayload extends Partial<CreateEmailPayload> {}
export interface UpdateEmailResponse extends Email {}

export interface DeleteEmailResponse extends Email {}

export class EmailApi {
	static async getEmail(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetEmailResponse>(`/emails/${id}`)
		return data
	}

	static async getMakeMarkup(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<string>(`/emails/${id}/make-markup`)
		return data
	}

	static async getUnmakeMarkup(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<string>(`/emails/${id}/unmake-markup`)
		return data
	}

	static async getMakeTemplate(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetMakeTemplateResponse>(
			`/emails/${id}/make`
		)
		return data
	}

	static async getUnmakeTemplate(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.get<GetUnmakeTemplateResponse>(
			`/emails/${id}/unmake`
		)
		return data
	}

	static async createEmail(payload: CreateEmailPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateEmailResponse>(
			'/emails',
			payload
		)
		return data
	}

	static async updateEmail(id: string, payload: UpdateEmailPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateEmailResponse>(
			`/emails/${id}`,
			payload
		)
		return data
	}

	static async deleteEmail(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteEmailResponse>(`/emails/${id}`)
		return data
	}
}
