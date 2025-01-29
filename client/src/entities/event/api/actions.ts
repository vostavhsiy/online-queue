'use server'

import {
	CreateEventPayload,
	EventApi,
	GetAllEventsResponse,
	GetEventResponse,
	UpdateEventPayload,
} from './api'

export const createEvent = async (payload: CreateEventPayload) => {
	try {
		const res = await EventApi.createEvent(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getAllEvents = async (): Promise<
	GetAllEventsResponse | string
> => {
	try {
		const res = await EventApi.getAll()
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getEvent = async (
	id: string
): Promise<GetEventResponse | string> => {
	try {
		const res = await EventApi.getOne(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateEvent = async (id: string, payload: UpdateEventPayload) => {
	try {
		const res = await EventApi.updateEvent(id, payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteEvent = async (id: string) => {
	try {
		const res = await EventApi.deleteEvent(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}
