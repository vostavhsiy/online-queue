import { clsx, type ClassValue } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const getDateTime = (dateString: Date | string) => {
	return moment(dateString).format('HH:mm')
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
