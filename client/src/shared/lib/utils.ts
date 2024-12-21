import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const getDateTime = (date: Date) => {
	const minutes = String(date.getMinutes())
	const formattedMinutes = minutes.length < 2 ? '0' + minutes : minutes

	const hours = String(date.getHours())
	const formattedHours = hours.length < 2 ? '0' + hours : hours

	return formattedHours + ':' + formattedMinutes
}

