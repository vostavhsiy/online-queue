'use client'

import { deleteAppointment } from '@/entities/appointment/api'
import { Customer } from '@/entities/customer/model'
import {
	Button,
	Combobox,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Separator,
} from '@/shared/ui'
import { FC, useState, useTransition } from 'react'

interface Props {
	events: Array<{
		label: string
		value: string
	}>
	eventId: string
	appointmentId?: string
	setEventId: (value: string) => void
	submit: (data: FormData) => void
	customer?: Customer
	defaultValues?: {
		from: string
		to: string
		date?: Date | string
	}
	close?: () => void
}

export const AppointmentUpdateForm: FC<Props> = ({
	events,
	eventId,
	setEventId,
	submit,
	defaultValues,
	close,
	appointmentId,
	customer,
}) => {
	const [open, setOpen] = useState(false)

	const [isPending, startTransition] = useTransition()

	const handleDelete = () => {
		setOpen(false)
		if (appointmentId) {
			startTransition(async () => {
				const res = await deleteAppointment(appointmentId)
				close && close()
			})
		}
	}

	const sumbitHandler = (data: FormData) => {
		startTransition(() => {
			submit(data)
		})
	}

	return (
		<div>
			<label className='flex flex-col gap-1 mb-5'>
				<span className='text-sm'>Мероприятие</span>
				<Combobox values={events} value={eventId} setValue={setEventId} />
			</label>
			<form action={sumbitHandler}>
				<label className='flex flex-col gap-1 mb-5'>
					<span className='text-sm'>Начало</span>
					<Input
						type='time'
						placeholder='From'
						name='from'
						defaultValue={defaultValues?.from}
						required
					/>
				</label>
				<label className='flex flex-col gap-1 mb-5'>
					<span className='text-sm'>Окончание</span>
					<Input
						type='time'
						placeholder='To'
						name='to'
						defaultValue={defaultValues?.to}
						required
					/>
				</label>
				{customer && (
					<>
						<Separator className='my-2' />
						<div className='flex flex-col gap-1'>
							<span>
								Посетитель: <strong>{customer.name}</strong>
							</span>
							<span>
								Email: <strong>{customer.email}</strong>
							</span>
							<span>
								Телефон: <strong>{customer.phone}</strong>
							</span>
						</div>
					</>
				)}
				<div className='mt-8 flex items-center justify-end gap-3'>
					<Dialog open={open} onOpenChange={value => setOpen(value)}>
						<DialogTrigger asChild>
							<Button disabled={isPending}>Удалить</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Удаление записи</DialogTitle>
							</DialogHeader>
							<div>Вы уверены, что хотите удалить запись?</div>
							<div className='flex items-center justify-end gap-3'>
								<Button
									onClick={() => {
										setOpen(false)
									}}
								>
									Нет
								</Button>
								<Button onClick={handleDelete}>Да</Button>
							</div>
						</DialogContent>
					</Dialog>
					<Button
						disabled={isPending}
						variant={'destructive'}
						type='button'
						onClick={() => close && close()}
					>
						Отменить
					</Button>
					<Button disabled={isPending} type='submit'>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AppointmentUpdateForm
