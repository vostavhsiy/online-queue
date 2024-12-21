'use server'

import {
	CreateTimePayload,
	TimeApi,
	UpdateTimePayload,
} from './api'

export const createTime = async (payload: CreateTimePayload) => {
	try {
		const res = await TimeApi.createTime(payload)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}


export const updateTime = async (
	id: string,
	payload: UpdateTimePayload
) => {
	try {
		const res = await TimeApi.updateTime(id, payload)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}

export const deleteTime = async (id: string) => {
	try {
		const res = await TimeApi.deleteTime(id)
		return res
	} catch (error) {
		console.log(error)
		return null
	}
}
