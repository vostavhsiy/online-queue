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
			console.log('start:', start, start.toISOString())
			start.setHours(+appointment.duration.from.split(':')[0])
			console.log(
				'start hours:',
				+appointment.duration.from.split(':')[0],
				start,
				start.toISOString()
			)
			start.setMinutes(+appointment.duration.from.split(':')[1])
			console.log(
				'start minutes:',
				+appointment.duration.from.split(':')[1],
				start,
				start.toISOString()
			)
			console.log('start after:', start, start.toISOString())

			const end = new Date(appointment.date)
			end.setHours(+appointment.duration.to.split(':')[0])
			end.setMinutes(+appointment.duration.to.split(':')[1])

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
