'use server'

import {
	CreateSchedulePayload,
	ScheduleApi,
	UpdateSchedulePayload,
} from './api'

export const createSchedule = async (payload: CreateSchedulePayload) => {
	try {
		const res = await ScheduleApi.createSchedule(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateSchedule = async (
	id: string,
	payload: UpdateSchedulePayload
) => {
	try {
		const res = await ScheduleApi.updateSchedule(id, payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteSchedule = async (id: string) => {
	try {
		const res = await ScheduleApi.deleteSchedule(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}
