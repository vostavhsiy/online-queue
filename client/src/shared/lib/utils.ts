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

export const getWordEnding = (count: number, wordForms: string[]) => {
	const lastDigit = count % 10
	const lastTwoDigits = count % 100

	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return wordForms[2]
	}

	if (lastDigit === 1) {
		return wordForms[0]
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		return wordForms[1]
	} else {
		return wordForms[2]
	}
}
