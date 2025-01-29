import { Customer } from '@/entities/customer/model'
import { EventWithRelations } from '@/entities/event/model'
import { EventInput } from '@fullcalendar/core'
import { AppointmentWithRelations } from '../model'

export const serializeAppointmentsFromEvent = (
	events: EventWithRelations[]
) => {
	try {
		const appointments = events
			.reduce((acc, event) => {
				return [...acc, ...event.appointments]
			}, [] as AppointmentWithRelations[])
			.filter(appointment => !appointment.isFromSchedule)
		const serializedAppointments: Array<
			EventInput & { customer: Customer; event: Event }
		> = appointments.map(appointment => {
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

			const start = new Date(appointment.date)
			start.setHours(startTime.hours)
			start.setMinutes(startTime.minutes)
			start.setSeconds(0)

			const end = new Date(appointment.date)
			end.setMinutes(start.getMinutes() + durationMinutes)

			const rrule =
				appointment.weekDay != undefined
					? {
							freq: 'weekly',
							interval: 1,
							byweekday: appointment.weekDay,
							dtstart: start.toISOString(),
					  }
					: undefined

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
	} catch (e) {
		console.log(e)
		return null
	}
}
