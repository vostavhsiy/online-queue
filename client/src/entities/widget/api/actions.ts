'use server'

import { revalidatePath } from 'next/cache'
import { CreateWidgetPayload, UpdateWidgetPayload, WidgetApi } from './api'

export const getWidget = async (id: string) => {
	try {
		const res = await WidgetApi.getWidget(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const createWidget = async (payload: CreateWidgetPayload) => {
	try {
		const res = await WidgetApi.createWidget(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateWidget = async (
	id: string,
	payload: UpdateWidgetPayload
) => {
	try {
		const res = await WidgetApi.updateWidget(id, payload)
		revalidatePath('/dashboard/widget')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteWidget = async (id: string) => {
	try {
		const res = await WidgetApi.deleteWidget(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}
