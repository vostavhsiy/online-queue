'use client'

import { Event } from '@/entities/event/model'
import { AppointmentUpdateForm } from '@/features/appointment-update-form'
import { getDateTime, weekDaysFromSunday } from '@/shared/lib'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator,
} from '@/shared/ui'
import { Edit2 } from 'lucide-react'
import { FC, useState } from 'react'
import { updateAppointment } from '../api/actions'
import { AppointmentWithRelations } from '../model'

interface Props {
	appointment: AppointmentWithRelations
	events: Event[]
}

export const AppointmentCard: FC<Props> = ({ appointment, events }) => {
	const date = new Date(appointment.date)
	const day = weekDaysFromSunday[date.getDay()]

	const [selectedEventId, setSelectedEventId] = useState<string>(
		appointment.eventId
	)
	const [isUpdateAppointmentDialogOpen, setIsUpdateAppointmentDialogOpen] =
		useState<boolean>(false)

	const start = new Date(appointment.date)
	start.setHours(+appointment.duration.from.split(':')[0])
	start.setMinutes(+appointment.duration.from.split(':')[1])

	const end = new Date(appointment.date)
	end.setHours(+appointment.duration.to.split(':')[0])
	end.setMinutes(+appointment.duration.to.split(':')[1])

	const handleCloseUpdateAppointmentDialog = () => {
		setIsUpdateAppointmentDialogOpen(false)
		setSelectedEventId(appointment.eventId)
	}

	const handleUpdateEvent = (data: FormData) => {
		const appointmentStartTime = data.get('from')?.toString()
		const appointmentEndTime = data.get('to')?.toString()
		if (!appointmentStartTime || !appointmentEndTime || !appointment?.id) return

		updateAppointment(appointment.id, {
			date: start,
			duration: { from: appointmentStartTime, to: appointmentEndTime },
			eventId: selectedEventId,
		}).then(res => {
			if (!res) return
			handleCloseUpdateAppointmentDialog()
		})
	}

	return (
		<>
			<div className='relative p-3 rounded border shadow'>
				<div>{date.toLocaleDateString()}</div>
				<div>{day}, </div>
				<div>
					с {appointment.duration.from} до {appointment.duration.to}
				</div>
				{appointment.customer && (
					<>
						<Separator className='my-2' />
						<div className='flex flex-col gap-1'>
							<span>
								Посетитель: <strong>{appointment.customer.name}</strong>
							</span>
							<span>
								Email: <strong>{appointment.customer.email}</strong>
							</span>
							<span>
								Телефон: <strong>{appointment.customer.phone}</strong>
							</span>
						</div>
					</>
				)}
				<Dialog
					open={isUpdateAppointmentDialogOpen}
					onOpenChange={setIsUpdateAppointmentDialogOpen}
				>
					<DialogTrigger asChild>
						<Button className='absolute top-3 right-3' size={'icon'}>
							<Edit2 />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								Инфомация о записи{' '}
								{appointment?.date &&
									new Date(appointment?.date).toLocaleDateString()}
							</DialogTitle>
						</DialogHeader>
						<AppointmentUpdateForm
							events={events.map(event => ({
								label: event.name,
								value: event.id,
							}))}
							appointmentId={appointment.id}
							eventId={selectedEventId}
							setEventId={setSelectedEventId}
							submit={handleUpdateEvent}
							customer={appointment.customer} 
							defaultValues={{
								from: getDateTime(start),
								to: getDateTime(end),
							}}
							close={() => setIsUpdateAppointmentDialogOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</>
	)
}
