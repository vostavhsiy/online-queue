import { AppointmentWithRelations } from '../model'

export const sortAppointments = (appointments: AppointmentWithRelations[]) => {
	try {
		return appointments.toSorted((a1, a2) => {
			const a1Date = new Date(a1.date)
			a1Date.setHours(+a1.duration.from.slice(0, 2))
			a1Date.setMinutes(+a1.duration.from.slice(3, 5))

			const a2Date = new Date(a2.date)
			a2Date.setHours(+a2.duration.from.slice(0, 2))
			a2Date.setMinutes(+a2.duration.from.slice(3, 5))
			return +a1Date - +a2Date
		})
	} catch (e) {
		console.log(e)
		return []
	}
}
