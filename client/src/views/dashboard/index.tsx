import { serializeAppointmentsFromEvent } from '@/entities/appointment/lib'
import { auth } from '@/entities/company/api'
import { getAllEvents } from '@/entities/event/api'
import Schedule from '@/widgets/schedule'
import { redirect } from 'next/navigation'

const DashboardScreen = async () => {
	const company = await auth()
	if (!company) redirect('/api/auth/signin')
	const appointments = serializeAppointmentsFromEvent(company.events) as any
	if (!appointments) return <h2>Error...</h2>

	const events = (await getAllEvents()) || []

	return (
		<>
			<p className='text-2xl mb-3'>Расписание</p>
			<Schedule appointments={appointments} events={events} />
		</>
	)
}

export default DashboardScreen
