'use server'

import {
	CreateCustomerPayload,
	CustomerApi,
	UpdateCustomerPayload,
} from './api'

export const createCustomer = async (payload: CreateCustomerPayload) => {
	try {
		const res = await CustomerApi.createCustomer(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateCustomer = async (
	id: string,
	payload: UpdateCustomerPayload
) => {
	try {
		const res = await CustomerApi.updateCustomer(id, payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteCustomer = async (id: string) => {
	try {
		const res = await CustomerApi.deleteCustomer(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}
