'use client'

import { Duration } from '@/entities/duration/model'
import { deleteEvent, updateEvent } from '@/entities/event/api'
import { EventWithRelations } from '@/entities/event/model'
import { cn, weekDays } from '@/shared/lib'
import {
	Button,
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useMemo, useState, useTransition } from 'react'

interface Props {
	event: EventWithRelations
}

const EditEventForm: FC<Props> = ({ event }) => {
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const [isScheduleAdded, setIsScheduleAdded] = useState(false)
	const [times, setTimes] = useState<
		Array<Omit<Duration, 'id'> & { timeId: number; weekDay: number }>
	>([])

	const [addingTimeOpen, setAddingTimeOpen] = useState(false)

	const [popoverOpen, setPopoverOpen] = useState(false)
	const [day, setDay] = useState(-1)

	useEffect(() => {
		if (!isScheduleAdded) {
			setTimes([])
		}
	}, [isScheduleAdded])

	const timesDays = useMemo(() => {
		return times.reduce((acc: any, time) => {
			if (!acc[time.weekDay])
				acc[time.weekDay] = [{ id: time.timeId, from: time.from, to: time.to }]
			else {
				acc[time.weekDay].push({
					id: time.timeId,
					from: time.from,
					to: time.to,
				})
			}
			return acc
		}, {})
	}, [times])

	const handleOpenChange = (open: boolean) => {
		setDay(-1)
		setAddingTimeOpen(open)
	}

	const handleAdd = (data: FormData) => {
		const from = data.get('from')
		const to = data.get('to')
		if (day === -1 || !from || !to) return
		const time = {
			timeId: times[times.length - 1] ? times[times.length - 1].timeId + 1 : 0,
			from: String(from),
			to: String(to),
			weekDay: day,
		}
		setTimes(prev => [...prev, time])
		setAddingTimeOpen(false)
	}

	const handleSubmit = (data: FormData) => {
		const eventTitle = String(data.get('eventTitle'))
		const timesDays: {
			[key: string]: Array<{ from: string; to: string }>
		} = {}
		times.forEach(time => {
			if (!timesDays[time.weekDay])
				timesDays[time.weekDay] = [{ from: time.from, to: time.to }]
			else {
				timesDays[time.weekDay].push({ from: time.from, to: time.to })
			}
		})
		startTransition(async () => {
			const res = await updateEvent(event.id, {
				name: eventTitle,
				schedule: isScheduleAdded
					? {
							times: Object.entries(timesDays).map(time => ({
								weekDay: +time[0],
								times: time[1],
								appointments: time[1].map(t => ({
									duration: t,
									date: new Date(),
								})),
							})),
					  }
					: undefined,
			})
			router.push(`/dashboard/events/${event.id}`)
		})
	}

	const handleDelete = () => {
		startTransition(() => {
			deleteEvent(event.id).then(() => {
				router.push(`/dashboard/events`)
			})
		})
	}

	return (
		<div className='h-full'>
			<form action={handleSubmit} className='flex flex-col gap-4 h-full'>
				<p className='text-2xl font-semibold'>Редактирование события</p>
				<label className='flex flex-col gap-2'>
					<span className='text-sm'>Введите новое название события:</span>
					<Input
						defaultValue={event.name}
						name='eventTitle'
						placeholder='Название события'
						required
					/>
				</label>
				<div className='flex flex-col gap-2'>
					<span className='text-sm font-semibold'>Новое расписание:</span>
					<Button
						type='button'
						variant={isScheduleAdded ? 'destructive' : 'default'}
						className='max-w-fit'
						onClick={() => setIsScheduleAdded(prev => !prev)}
					>
						{isScheduleAdded ? 'Удалить' : 'Добавить'} новое расписание
					</Button>
				</div>
				{isScheduleAdded && (
					<div>
						<div className='flex items-center gap-5'>
							<span>
								Укажите дни и время, в которое будет проводится событие каждую
								неделю:
							</span>
							<Dialog open={addingTimeOpen} onOpenChange={handleOpenChange}>
								<DialogTrigger asChild>
									<Button type='button'>Добавить</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Добавьте дни и время</DialogTitle>
									</DialogHeader>
									<form action={handleAdd} className='flex flex-col gap-5'>
										<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
											<PopoverTrigger asChild>
												<Button
													type='button'
													variant='outline'
													role='combobox'
													className='w-[200px] justify-between'
												>
													{day !== -1
														? weekDays.find((d, i) => i === day)
														: 'Выберите день...'}
													<ChevronsUpDown className='opacity-50' />
												</Button>
											</PopoverTrigger>
											<PopoverContent className='w-[200px] p-0'>
												<Command>
													<CommandList>
														<CommandGroup>
															{weekDays.map((d, i) => (
																<CommandItem
																	key={i}
																	value={String(i)}
																	onSelect={currentValue => {
																		setDay(
																			+currentValue === day ? -1 : +currentValue
																		)
																		setPopoverOpen(false)
																	}}
																>
																	{d}
																	<Check
																		className={cn(
																			'ml-auto',
																			day == i ? 'opacity-100' : 'opacity-0'
																		)}
																	/>
																</CommandItem>
															))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
										<label className='flex flex-col gap-1'>
											<span className='text-sm'>
												Выберите время начала события
											</span>
											<Input
												type='time'
												placeholder='From'
												name='from'
												required
											/>
										</label>
										<label className='flex flex-col gap-1'>
											<span className='text-sm'>
												Выберите время окончания события
											</span>
											<Input type='time' placeholder='To' name='to' required />
										</label>
										<Button type='submit'>Добавить</Button>
									</form>
								</DialogContent>
							</Dialog>
						</div>

						<div className='shadow rounded-lg'>
							<div className={`grid grid-cols-7 mt-3 border-2 rounded-t-lg`}>
								{weekDays.map((d, i) => {
									return (
										<div
											key={i}
											className='p-2 w-full flex justify-center border-l-2 first:border-l-0'
										>
											{d}
										</div>
									)
								})}
							</div>
							{!!times.length && (
								<div
									className={`grid grid-cols-7 border-2 border-t-0 rounded-b-lg`}
								>
									{weekDays.map((day, i) => {
										return (
											<div
												key={i}
												className='p-2 w-full flex justify-center border-l-2 first:border-l-0'
											>
												{timesDays[i] && (
													<div className='flex flex-col gap-3'>
														{timesDays[i].map((time: any) => {
															return (
																<div
																	key={time.id}
																	className='flex items-center gap-2'
																>
																	<span>
																		С {time.from} до {time.to}
																	</span>
																	<Button
																		type='button'
																		onClick={() => {
																			setTimes(prev =>
																				prev.filter(t => t.timeId !== time.id)
																			)
																		}}
																		size={'icon'}
																		variant={'destructive'}
																	>
																		<X />
																	</Button>
																</div>
															)
														})}
													</div>
												)}
											</div>
										)
									})}
								</div>
							)}
						</div>
					</div>
				)}
				<div className='flex-1 flex items-end justify-between'>
					<Button
						type='button'
						variant={'outline'}
						className='max-w-fit'
						onClick={() => router.back()}
					>
						Назад
					</Button>
					<div className='flex items-center gap-3'>
						<Button
							type='button'
							variant={'destructive'}
							className='max-w-fit'
							onClick={handleDelete}
							disabled={isPending}
						>
							Удалить
						</Button>
						<Button disabled={isPending} type='submit' className='max-w-fit'>
							Сохранить
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditEventForm
