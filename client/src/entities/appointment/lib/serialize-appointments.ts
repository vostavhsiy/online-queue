import { Customer } from '@/entities/customer/model'
import { EventWithRelations } from '@/entities/event/model'
import { EventInput } from '@fullcalendar/core'
import moment from 'moment'
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
			console.log('time', startTime, endTime)

			const durationMinutes =
				endTime.hours * 60 +
				endTime.minutes -
				startTime.hours * 60 -
				startTime.minutes

			const start = new Date(appointment.date)
			start.setHours(startTime.hours)
			start.setMinutes(startTime.minutes)
			start.setSeconds(0)

			console.log('start', start, moment(start).format('YYYY-MM-DDTHH:mm:ss'))

			const end = moment(start)
				.add(durationMinutes, 'minutes')
				.format('YYYY-MM-DDTHH:mm:ss')

			console.log('end', end)

			const rrule =
				appointment.weekDay != undefined
					? {
							freq: 'weekly',
							interval: 1,
							byweekday: appointment.weekDay,
							dtstart: moment(start).format('YYYY-MM-DDTHH:mm:ss'),
					  }
					: undefined

			return {
				id: appointment.id,
				title: appointment.event.name,
				start: moment(start).format('YYYY-MM-DDTHH:mm:ss'),
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
