import { AppointmentWithRelations } from '@/entities/appointment/model'
import { AppointmentCard } from '@/entities/appointment/ui'
import { getAllEvents, getEvent } from '@/entities/event/api'
import { weekDays } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
	params: Promise<{ id: string }>
}

const DashboardEvent: NextPage<Props> = async props => {
	const params = await props.params

	const event = await getEvent(params.id)
	const events = await getAllEvents()
	if (
		!event ||
		typeof event === 'string' ||
		!events ||
		typeof events === 'string'
	)
		notFound()

	const appointments =
		!!event.schedule && !!event.schedule.times.length
			? event.schedule.times.reduce((res: AppointmentWithRelations[], time) => {
					res = [...res, ...time.appointments]
					return res
			  }, [])
			: null

	return (
		<div className='h-full flex flex-col'>
			<div className='mb-10 flex items-start gap-3 justify-between'>
				<div className='flex mt-5  items-end gap-3 text-4xl font-semibold transition-all hover:text-primary/80'>
					<div className='max-w-[60%]'>{event.name}</div>
					<span className='font-normal text-lg text-primary/70'>
						Мероприятие
					</span>
				</div>
			</div>
			<div className='mb-5'>
				<span className='block mb-2 text-2xl'>Записи</span>
				{!event.appointments.length && (
					<span className='block text-lg text-primary/70'>
						Записи отсутствуют!
					</span>
				)}
				<div className='grid grid-cols-auto-fill-300 gap-5'>
					{event.appointments
						.filter(appointment => appointment.weekDay === null)
						.map(appointment => {
							return (
								<AppointmentCard
									key={appointment.id}
									appointment={appointment}
									events={events}
								/>
							)
						})}
				</div>
			</div>
			{!!appointments?.length && (
				<div className='flex flex-col gap-1'>
					<span className='block mb-2 text-2xl'>Расписание</span>
					<div className='flex flex-col gap-1'>
						{appointments
							.sort((a1, a2) => Number(a1.weekDay) - Number(a2.weekDay))
							.map(appointment => {
								if (appointment.weekDay === undefined) return null
								return (
									<div key={appointment.id} className='flex items-center gap-5'>
										<div className='w-[90px]'>
											{weekDays[appointment.weekDay]}
										</div>
										<span>
											{appointment.duration.from} - {appointment.duration.to}
										</span>
									</div>
								)
							})}
					</div>
				</div>
			)}
			<div className='flex-1 flex items-end justify-end'>
				<div className='flex items-center gap-3'>
					<Button
						type='submit'
						variant={'destructive'}
						className='max-w-fit'
						asChild
					>
						<Link href={'/dashboard/events'}>Назад</Link>
					</Button>
					<Button type='submit' className='max-w-fit' asChild>
						<Link href={`/dashboard/events/${event.id}/edit`}>
							Редактировать
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default DashboardEvent
