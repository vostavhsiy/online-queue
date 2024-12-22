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

export const setDateHours = (date: Date | string, ...args: number[]) => {
	const newDate = new Date(date)
	const timezoneOffset = newDate.getTimezoneOffset()
	if (timezoneOffset > 0) {
		newDate.setMinutes(24 * 60 - (timezoneOffset + 1))
	} else {
		newDate.setMinutes(-timezoneOffset)
	}
	//@ts-ignore
	newDate.setUTCHours.apply(this, args)
	return newDate
}
