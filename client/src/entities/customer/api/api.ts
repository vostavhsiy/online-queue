import { getMainInstance } from '@/shared/api'
import { Customer, CustomerWithRelations } from '../model'

export interface CreateCustomerPayload extends Omit<Customer, 'id'> {}
export interface CreateCustomerResponse extends CustomerWithRelations {}

export interface UpdateCustomerPayload extends Partial<CreateCustomerPayload> {}
export interface UpdateCustomerResponse extends Customer {}

export interface DeleteCustomerResponse extends Customer {}

export class CustomerApi {
	static async createCustomer(payload: CreateCustomerPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.post<CreateCustomerResponse>(
			'/customers',
			payload
		)
		return data
	}

	static async updateCustomer(id: string, payload: UpdateCustomerPayload) {
		const instanse = await getMainInstance()
		const { data } = await instanse.patch<UpdateCustomerResponse>(
			`/customers/${id}`,
			payload
		)
		return data
	}

	static async deleteCustomer(id: string) {
		const instanse = await getMainInstance()
		const { data } = await instanse.delete<DeleteCustomerResponse>(
			`/customers/${id}`
		)
		return data
	}
}
