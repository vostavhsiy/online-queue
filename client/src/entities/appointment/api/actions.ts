'use server'

import { revalidatePath } from 'next/cache'
import {
	AppointmentApi,
	CreateAppointmentPayload,
	UpdateAppointmentPayload,
} from './api'

export const createAppointment = async (payload: CreateAppointmentPayload) => {
	try {
		const res = await AppointmentApi.createAppointment(payload)
		revalidatePath('/dashboard')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getAppointment = async (id: string) => {
	try {
		const res = await AppointmentApi.getOne(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateAppointment = async (
	id: string,
	payload: UpdateAppointmentPayload
) => {
	try {
		const res = await AppointmentApi.updateAppointment(id, payload)
		revalidatePath('/dashboard')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteAppointment = async (id: string) => {
	try {
		const res = await AppointmentApi.deleteAppointment(id)
		revalidatePath('/dashboard', 'page')
		revalidatePath('/dashboard/events/[id]', 'page')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}
