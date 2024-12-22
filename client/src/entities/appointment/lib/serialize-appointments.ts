import { Customer } from '@/entities/customer/model'
import { EventWithRelations } from '@/entities/event/model'
import { EventInput } from '@fullcalendar/core'
import { AppointmentWithRelations } from '../model'

export const serializeAppointmentsFromEvent = (
	events: EventWithRelations[]
) => {
	try {
		const appointments = events.reduce((acc, event) => {
			return [...acc, ...event.appointments]
		}, [] as AppointmentWithRelations[])
		const serializedAppointments: Array<
			EventInput & { customer: Customer; event: Event }
		> = appointments.map(appointment => {
			const start = new Date(appointment.date)
			const startCurrentDate = start.getDate()
			const startCurrentMonth = start.getMonth()
			const startCurrentYear = start.getFullYear()

			start.setHours(+appointment.duration.from.split(':')[0])
			start.setMinutes(+appointment.duration.from.split(':')[1])
			start.setDate(startCurrentDate)
			start.setMonth(startCurrentMonth)
			start.setFullYear(startCurrentYear)

			const end = new Date(appointment.date)
			const endCurrentDate = start.getDate()
			const endCurrentMonth = start.getMonth()
			const endCurrentYear = start.getFullYear()

			end.setUTCHours(+appointment.duration.to.split(':')[0])
			end.setUTCMinutes(+appointment.duration.to.split(':')[1])
			end.setDate(endCurrentDate)
			end.setMonth(endCurrentMonth)
			end.setFullYear(endCurrentYear)

			const rrule =
				appointment.weekDay != undefined
					? {
							freq: 'weekly',
							interval: 1,
							byweekday: appointment.weekDay,
							dtstart: start.toISOString(),
					  }
					: undefined

			const startTime = {
				hours: +appointment.duration.from.split(':')[0],
				minutes: +appointment.duration.from.split(':')[1],
			}

			const endTime = {
				hours: +appointment.duration.to.split(':')[0],
				minutes: +appointment.duration.to.split(':')[1],
			}

			const durationMinutes =
				endTime.hours * 60 +
				endTime.minutes -
				startTime.hours * 60 -
				startTime.minutes

			return {
				id: appointment.id,
				title: appointment.event.name,
				start,
				end,
				duration: {
					minutes: durationMinutes,
				},
				rrule,
				event: appointment.event,
				customer: appointment.customer,
			} as any
		})
		return serializedAppointments
	} catch {
		return null
	}
}
