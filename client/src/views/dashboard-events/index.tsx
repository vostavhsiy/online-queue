import { getAllEvents } from '@/entities/event/api'
import { EventCard } from '@/entities/event/ui'
import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const DashboardEvents = async () => {
	// const company = await auth()
	// if (!company) redirect('/api/auth/signin')
	const events = await getAllEvents()

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-3xl'>Ваши мероприятия</p>
			<Button asChild className='max-w-fit'>
				<Link href={'/dashboard/events/create'}>
					<Plus />
					Добавить мероприятие	
				</Link>
			</Button>
			{events?.map(event => {
				return <EventCard key={event.id} event={event} />
			})}
		</div>
	)
}

export default DashboardEvents
