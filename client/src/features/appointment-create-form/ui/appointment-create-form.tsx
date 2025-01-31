'use client'

import { Button, Combobox, Input } from '@/shared/ui'
import { FC, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	events: Array<{
		label: string
		value: string
	}>
	eventId: string
	setEventId: (value: string) => void
	submit: (data: FormData) => void
	defaultValues?: {
		from: string
		to: string
	}
}

export const AppointmentCreateForm: FC<Props> = ({
	events,
	eventId,
	setEventId,
	submit,
	defaultValues,
}) => {
	const [isPending, startTransition] = useTransition()

	const sumbitHandler = (data: FormData) => {
		startTransition(async () => {
			try {
				await submit(data)
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
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
				<div className='text-end'>
					<Button type='submit' disabled={isPending}>
						Сохранить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default AppointmentCreateForm
