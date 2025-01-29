'use server'

import { AxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import {
	CompanyApi,
	CompanyUpdatePayload,
	SignInPayload,
	SignUpPayload,
} from './api'

export const signUp = async (payload: SignUpPayload) => {
	try {
		const res = await CompanyApi.signUp(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const signIn = async (payload: SignInPayload) => {
	try {
		const res = await CompanyApi.signIn(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const signInWithOAuth = async (
	payload: Omit<SignUpPayload, 'password'>
) => {
	try {
		const res = await CompanyApi.signInWithOAuth(payload)
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}

export const auth = async () => {
	try {
		const res = await CompanyApi.auth()
		return res
	} catch (error) {
		const e = error as AxiosError
		console.log(e.message)
		//@ts-ignore
		return 'Произошла ошибка!'
	}
}

export const updateCompany = async (
	id: string,
	payload: CompanyUpdatePayload
) => {
	try {
		const res = await CompanyApi.update(id, payload)
		revalidatePath('/dashboard')
		revalidatePath('/dashboard/settings')
		revalidatePath('/')
		return res
	} catch (error) {
		console.log(error)
		//@ts-ignore
		return error.response?.data?.message || 'Произошла ошибка!'
	}
}
