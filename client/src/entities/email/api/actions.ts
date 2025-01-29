'use server'

import { revalidatePath } from 'next/cache'
import { CreateEmailPayload, EmailApi, UpdateEmailPayload } from './api'

export const getEmail = async (id: string) => {
	try {
		const res = await EmailApi.getEmail(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getEmailMakeMarkup = async (id: string) => {
	try {
		const res = await EmailApi.getMakeMarkup(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getEmailUnmakeMarkup = async (id: string) => {
	try {
		const res = await EmailApi.getUnmakeMarkup(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getEmailMakeTemplate = async (id: string) => {
	try {
		const res = await EmailApi.getMakeTemplate(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const getEmailUnmakeTemplate = async (id: string) => {
	try {
		const res = await EmailApi.getUnmakeTemplate(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const createEmail = async (payload: CreateEmailPayload) => {
	try {
		const res = await EmailApi.createEmail(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const updateEmail = async (id: string, payload: UpdateEmailPayload) => {
	try {
		const res = await EmailApi.updateEmail(id, payload)
		revalidatePath('/dashboard/emails/make')
		revalidatePath('/dashboard/emails/unmake')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const deleteEmail = async (id: string) => {
	try {
		const res = await EmailApi.deleteEmail(id)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		throw error.response?.data?.message || 'Произошла ошибка!'
	}
}
