import { Customer } from '@/entities/customer/model'
import { EventWithRelations } from '@/entities/event/model'
import { EventInput } from '@fullcalendar/core'
import moment from 'moment'
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
			// const start = new Date(appointment.date)
			// console.log('start', start.toUTCString())
			// const startTimezone = -start.getTimezoneOffset()
			// console.log('start zone', startTimezone)
			// start.setUTCMinutes(
			// 	startTimezone > 0
			// 		? start.getUTCMinutes() + startTimezone
			// 		: start.getUTCMinutes() - startTimezone
			// )
			// console.log('start af minutes', start)
			// start.setUTCHours(
			// 	+appointment.duration.from.split(':')[0],
			// 	+appointment.duration.from.split(':')[1]
			// )
			// console.log('start af hourss', start)
			// if (startTimezone > 0) {
			// 	start.setMinutes(start.getMinutes() - startTimezone)
			// } else start.setMinutes(start.getMinutes() + startTimezone)
			// console.log('new start', start)

			const start = moment(appointment.date)
			start.set({ hours: 13 })
			console.log('start', start.format())

			const end = new Date(appointment.date)
			const endTimezone = -end.getTimezoneOffset()
			end.setUTCMinutes(
				endTimezone > 0
					? end.getUTCMinutes() + endTimezone
					: end.getUTCMinutes() - endTimezone
			)
			end.setUTCHours(
				+appointment.duration.to.split(':')[0],
				+appointment.duration.to.split(':')[1]
			)
			if (endTimezone > 0) {
				end.setMinutes(end.getMinutes() - endTimezone)
			} else end.setMinutes(end.getMinutes() + endTimezone)

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
	} catch (e) {
		console.log(e)
		return null
	}
}
