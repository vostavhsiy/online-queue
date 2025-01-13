'use client'

import { Event } from '@/entities/event/model'
import { FC } from 'react'
import { AppointmentWithRelations } from '../model'
import { AppointmentsListItem } from './appointments-list-item'

interface Props {
	appointments: AppointmentWithRelations[]
	events: Event[]
}

export const AppointmentsList: FC<Props> = ({ appointments, events }) => {
	return (
		<div className='flex flex-col gap-4'>
			{appointments.map(appointment => {
				return (
					<AppointmentsListItem
						key={appointment.id}
						appointment={appointment}
						events={events}
					/>
				)
			})}
		</div>
	)
}
