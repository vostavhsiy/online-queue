'use client'

import { createAppointment } from '@/entities/appointment/api'
import { updateAppointment } from '@/entities/appointment/api/actions'
import { Customer } from '@/entities/customer/model'
import { Event, EventWithRelations } from '@/entities/event/model'
import { AppointmentCreateForm } from '@/features/appointment-create-form'
import { AppointmentUpdateForm } from '@/features/appointment-update-form'
import { cn, getDateTime } from '@/shared/lib'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Skeleton,
	useSidebar,
} from '@/shared/ui'
import {
	DateSelectArg,
	EventChangeArg,
	EventClickArg,
	EventInput,
} from '@fullcalendar/core'
import ruLocale from '@fullcalendar/core/locales/ru'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'

type ScheduleAppointment = EventInput & { customer: Customer; event: Event }

interface Props {
	appointments: Array<ScheduleAppointment>
	events: EventWithRelations[]
}

const Schedule: FC<Props> = ({ appointments, events }) => {
	const { state: sidebarState } = useSidebar()

	const [isViewMount, setViewMount] = useState(false)
	const [isCreateAppointmentDialogOpen, setIsCreateAppointmentDialogOpen] =
		useState<boolean>(false)
	const [isUpdateAppointmentDialogOpen, setIsUpdateAppointmentDialogOpen] =
		useState<boolean>(false)
	const [newEventId, setNewEventId] = useState(events[0]?.id)
	const [selectedEventId, setSelectedEventId] = useState<string>('')
	const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
	const [selectedAppointement, setSelectedAppointment] =
		useState<ScheduleAppointment | null>(null)

	const calendarRef = useRef<FullCalendar>(null)
	const calendarWrapperRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		calendarRef.current?.getApi().changeView('listWeek')
	}, [])

	const resizeCalendar = () => {
		const wrapper = calendarWrapperRef.current
		if (wrapper) {
			wrapper.style.opacity = '0'
		}
		setTimeout(() => {
			if (wrapper) {
				wrapper.style.opacity = '1'
			}
			calendarRef.current?.getApi().updateSize()
		}, 200)
	}

	useEffect(() => {
		resizeCalendar()
	}, [sidebarState])

	const handleDateClick = (selected: DateSelectArg) => {
		setSelectedDate(selected)
		setIsCreateAppointmentDialogOpen(true)
	}

	const handleEventClick = (selected: EventClickArg) => {
		const appointment = appointments.find(app => {
			return app.id === selected.event.id
		})
		if (!appointment) return
		setSelectedAppointment(appointment)
		setSelectedEventId(appointment.event.id)
		setIsUpdateAppointmentDialogOpen(true)
	}

	const handleCloseAddAppointmentDialog = () => {
		setIsCreateAppointmentDialogOpen(false)
		setSelectedDate(null)
		setNewEventId(events[0].id)
	}

	const handleCloseUpdateAppointmentDialog = () => {
		setIsUpdateAppointmentDialogOpen(false)
		setSelectedAppointment(null)
		setSelectedEventId('')
	}

	const handleAddEvent = (data: FormData) => {
		const appointmentStartTime = data.get('from')?.toString()
		const appointmentEndTime = data.get('to')?.toString()
		if (!appointmentStartTime || !appointmentEndTime || !selectedDate) return
		const date = selectedDate.start.toISOString()
		console.log(selectedDate.start, selectedDate.startStr, date)
		createAppointment({
			date,
			duration: { from: appointmentStartTime, to: appointmentEndTime },
			eventId: newEventId,
		}).then(res => {
			if (!res) return
			handleCloseAddAppointmentDialog()
		})
	}

	const handleUpdateEvent = (data: FormData) => {
		const appointmentStartTime = data.get('from')?.toString()
		const appointmentEndTime = data.get('to')?.toString()
		if (
			!appointmentStartTime ||
			!appointmentEndTime ||
			!selectedAppointement?.id
		)
			return

		updateAppointment(selectedAppointement.id, {
			date: selectedAppointement.start as Date,
			duration: { from: appointmentStartTime, to: appointmentEndTime },
			eventId: selectedEventId,
		}).then(res => {
			if (!res) return
			handleCloseUpdateAppointmentDialog()
		})
	}

	const handleChangeEvent = (event: EventChangeArg) => {
		const start = event.event.start
		const end = event.event.end
		if (!start || !end) {
			event.revert()
			return ``
		}
		updateAppointment(event.oldEvent.id, {
			date: start,
			duration: { from: getDateTime(start), to: getDateTime(end) },
		})
	}

	return (
		<div className='w-full relative'>
			{!isViewMount && (
				<div>
					<Skeleton className='absolute z-[1] mt-3 w-full h-[85vh]' />
				</div>
			)}
			<div className='flex w-full justify-start items-start gap-8'>
				<div
					className={cn(
						'relative z-0 w-full mt-2 transition-all duration-75',
						!isViewMount && 'opacity-0 invisible'
					)}
					ref={calendarWrapperRef}
				>
					<FullCalendar
						ref={calendarRef}
						height={'85vh'}
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							interactionPlugin,
							listPlugin,
							rrulePlugin,
						]}
						buttonText={{
							today: 'Сегодня',
							week: 'Неделя',
							day: 'День',
							month: 'Месяц',
							listWeek: 'Список',
						}}
						headerToolbar={{
							left: 'prev,next today',
							center: 'title',
							right: 'listWeek,dayGridMonth,timeGridWeek,timeGridDay',
						}}
						locale={ruLocale}
						nowIndicator={true}
						allDaySlot={false}
						initialView='dayGridMonth'
						editable={true}
						selectable={true}
						selectMirror={true}
						dayMaxEvents={true}
						select={handleDateClick}
						eventClick={handleEventClick}
						eventChange={handleChangeEvent}
						events={[...appointments]}
						displayEventEnd={true}
						viewDidMount={() => {
							setTimeout(() => {
								setViewMount(true)
							}, 200)
						}}
					/>
				</div>
			</div>

			<Dialog
				open={isCreateAppointmentDialogOpen}
				onOpenChange={setIsCreateAppointmentDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Добавить запись</DialogTitle>
					</DialogHeader>
					<AppointmentCreateForm
						events={events.map(event => ({
							label: event.name,
							value: event.id,
						}))}
						eventId={newEventId}
						setEventId={setNewEventId}
						submit={handleAddEvent}
						defaultValues={
							selectedDate
								? {
										from: getDateTime(selectedDate.start),
										to: getDateTime(selectedDate.end),
								  }
								: undefined
						}
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				open={isUpdateAppointmentDialogOpen}
				onOpenChange={setIsUpdateAppointmentDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Инфомация о записи{' '}
							{selectedAppointement?.start &&
								new Date(
									selectedAppointement.start as Date
								).toLocaleDateString()}
						</DialogTitle>
					</DialogHeader>
					<AppointmentUpdateForm
						events={events.map(event => ({
							label: event.name,
							value: event.id,
						}))}
						eventId={selectedEventId}
						setEventId={setSelectedEventId}
						submit={handleUpdateEvent}
						appointmentId={selectedAppointement?.id}
						customer={selectedAppointement?.customer}
						defaultValues={
							selectedAppointement?.start && selectedAppointement?.end
								? {
										from: getDateTime(selectedAppointement.start as Date),
										to: getDateTime(selectedAppointement.end as Date),
								  }
								: undefined
						}
						close={() => setIsUpdateAppointmentDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default Schedule
