'use client'

import { updateCompany } from '@/entities/company/api'
import { Company } from '@/entities/company/model'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
} from '@/shared/ui'
import { FC, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface Props {
	company: Omit<Company, 'password'>
}

export const CompanySettingsForm: FC<Props> = ({ company }) => {
	const [open, setOpen] = useState(false)

	const form = useRef<HTMLFormElement>(null)

	const [isPending, startTransition] = useTransition()

	const submit = (data: FormData) => {
		const email = data.get('email')
		const name = data.get('name')
		const password = data.get('password')
		const payload: any = {}
		if (email) {
			payload.email = email
		}
		if (name) {
			payload.name = name
		}
		if (password) {
			payload.password = password
		}
		setOpen(false)
		startTransition(async () => {
			try {
				const res = await updateCompany(company.id, payload)
				if (!res || typeof res === 'string')
					toast.error(res || 'Произошла ошибка. Попробуйте позже.')
				else toast.success('Настройки сохранены!')
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
		})
	}

	return (
		<div>
			<form
				ref={form}
				action={submit}
				className='flex flex-col items-end gap-5'
			>
				<label className='w-full flex flex-col gap-1'>
					<span className='text-sm'>Название компании</span>
					<Input
						name='name'
						type='text'
						placeholder='Названиеы'
						defaultValue={company.name}
					/>
				</label>
				<label className='w-full flex flex-col gap-1'>
					<span className='text-sm'>Адрес электронной почты</span>
					<Input
						name='email'
						type='email'
						placeholder='Email'
						defaultValue={company.email}
					/>
				</label>
				<label className='w-full flex flex-col gap-1'>
					<span className='text-sm'>Новый пароль</span>
					<Input
						name='password'
						type='password'
						placeholder='Введите, если хотите поменять пароль'
					/>
				</label>
				<Dialog open={open} onOpenChange={value => setOpen(value)}>
					<DialogTrigger asChild>
						<Button type='button' disabled={isPending}>
							Сохранить
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Вы уверены, что хотите изменить данные?</DialogTitle>
						</DialogHeader>
						<div className='flex items-center justify-end gap-3'>
							<Button type='button' onClick={() => setOpen(false)}>
								Нет
							</Button>
							<Button
								type='submit'
								onClick={() => form.current?.requestSubmit()}
							>
								Да
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</form>
		</div>
	)
}
