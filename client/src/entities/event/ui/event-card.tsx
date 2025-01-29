import { AppointmentWithRelations } from '@/entities/appointment/model'
import { getWordEnding, weekDays } from '@/shared/lib'
import { Button } from '@/shared/ui'
import Link from 'next/link'
import { FC } from 'react'
import { EventWithRelations } from '../model'

interface Props {
	event: EventWithRelations
}

export const EventCard: FC<Props> = ({ event }) => {
	const appointments =
		!!event.schedule && !!event.schedule.times.length
			? event.schedule.times.reduce((res: AppointmentWithRelations[], time) => {
					res = [...res, ...time.appointments]
					return res
			  }, [])
			: null

	return (
		<div className='p-5 shadow border rounded'>
			<div className='mb-3 flex items-start gap-3 justify-between'>
				<Link
					href={`/dashboard/events/${event.id}`}
					className='text-2xl font-semibold transition-all hover:text-primary/80'
				>
					{event.name}
				</Link>
				<div className='flex items-center gap-3'>
					<Button variant={'outline'} asChild>
						<Link href={`/dashboard/events/${event.id}`}>Подробнее</Link>
					</Button>
					{/* <Button variant={'destructive'}>Удалить</Button> */}
				</div>
			</div>
			<span className='block mb-2 text-lg text-primary/60'>
				{event.appointments.length}{' '}
				{getWordEnding(event.appointments.length, [
					'запись',
					'записи',
					'записей',
				])}
			</span>
			{!!appointments?.length && (
				<div className='flex flex-col gap-1'>
					<span className='text-lg'>Расписание</span>
					<div className='flex flex-col gap-1'>
						{appointments
							.sort((a1, a2) => Number(a1.weekDay) - Number(a2.weekDay))
							.map(appointment => {
								if (appointment.weekDay === undefined) return null
								return (
									<div
										key={appointment.id}
										className='flex items-center gap-5 text-sm'
									>
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
		</div>
	)
}
