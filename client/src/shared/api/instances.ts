import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '../config'

export const mainInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
	withCredentials: true,
})
export const getMainInstance = async () => {
	const session = await getServerSession(authOptions)
	const accessToken = session?.accessToken
	if (accessToken) {
		mainInstance.defaults.headers.Authorization = 'Bearer ' + accessToken
	} else {
		mainInstance.defaults.headers.Authorization = ''
	}
	return mainInstance
}
