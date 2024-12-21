'use server'

import { CreateEventPayload, EventApi, UpdateEventPayload } from './api'

export const createEvent = async (payload: CreateEventPayload) => {
	try {
		const res = await EventApi.createEvent(payload)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}

export const getAllEvents = async () => {
	try {
		const res = await EventApi.getAll()
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}

export const getEvent = async (id: string) => {
	try {
		const res = await EventApi.getOne(id)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}

export const updateEvent = async (id: string, payload: UpdateEventPayload) => {
	try {
		const res = await EventApi.updateEvent(id, payload)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}

export const deleteEvent = async (id: string) => {
	try {
		const res = await EventApi.deleteEvent(id)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}
