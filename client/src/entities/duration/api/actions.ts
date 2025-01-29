'use server'

import { CreateDurationPayload, DurationApi } from './api'

export const createDuration = async (payload: CreateDurationPayload) => {
	try {
		const res = await DurationApi.createDuration(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteDuration = async (id: string) => {
	try {
		const res = await DurationApi.deleteDuration(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}
