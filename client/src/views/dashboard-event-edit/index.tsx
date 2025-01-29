import { getEvent } from '@/entities/event/api'
import { EditEventForm } from '@/features/edit-event-form'
import { NextPage } from 'next'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ id: string }>
}

const DashboardEventsEdit: NextPage<Props> = async props => {
	const params = await props.params

	const event = await getEvent(params.id)
	if (!event || typeof event === 'string') notFound()
	return (
		<div className='h-full'>
			<EditEventForm event={event} />
		</div>
	)
}

export default DashboardEventsEdit
