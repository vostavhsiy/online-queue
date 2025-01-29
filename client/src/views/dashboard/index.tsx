import { sortAppointments } from '@/entities/appointment/lib'
import { AppointmentWithRelations } from '@/entities/appointment/model'
import { AppointmentsList } from '@/entities/appointment/ui'
import { auth } from '@/entities/company/api'
import { getAllEvents } from '@/entities/event/api'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const DashboardScreen = async () => {
	const company = await auth()
	if (!company) redirect('/signin')
		
	const appointments = sortAppointments(
		company.events.reduce(
			(acc, app) => [...acc, ...app.appointments],
			[] as AppointmentWithRelations[]
		)
	).filter(appointment => {
		if (!appointment.time) return false
		if (appointment.isFromSchedule && !appointment.customer) return false
	})
	const events = await getAllEvents()
	if (!appointments || !events) redirect('/')

	return (
		<>
			<p className='text-3xl mt-5 mb-8'>Ближайшие записи</p>
			{appointments.length ? (
				<AppointmentsList appointments={appointments} events={events} />
			) : (
				<div className='flex items-center gap-3'>
					<p className='text-destructive'>Записей нет!</p>
					<Link className='underline' href='/dashboard/schedule'>
						Добавьте новую запись!
					</Link>
				</div>
			)}
		</>
	)
}

export default DashboardScreen
