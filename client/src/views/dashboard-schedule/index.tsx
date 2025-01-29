import { serializeAppointmentsFromEvent } from '@/entities/appointment/lib'
import { auth } from '@/entities/company/api'
import { getAllEvents } from '@/entities/event/api'
import Schedule from '@/widgets/schedule'
import { redirect } from 'next/navigation'

const DashboardScheduleScreen = async () => {
	const company = await auth()
	if (!company || typeof company === 'string') redirect('/signin')
	const appointments = serializeAppointmentsFromEvent(company.events) as any
	if (!appointments) redirect('/')

	const events = (await getAllEvents()) || []
	if (typeof events === 'string') redirect('/')

	return (
		<>
			<p className='text-2xl mt-5 mb-3'>Расписание</p>
			<Schedule appointments={appointments} events={events} />
		</>
	)
}

export default DashboardScheduleScreen
