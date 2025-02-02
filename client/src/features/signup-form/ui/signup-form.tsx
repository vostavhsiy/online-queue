'use client'

import { signUp } from '@/entities/company/api'
import { Button, Input, Separator, SeparatorWithText } from '@/shared/ui'
import { VkSignInButton } from '@/widgets/vk-signin-button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

const SignUpForm = () => {
	const router = useRouter()

	const [isPending, startTransition] = useTransition()

	const handleSubmit = (data: FormData) => {
		const email = data.get('email')?.toString()
		const name = data.get('name')?.toString()
		const password = data.get('password')?.toString()
		if (!email || !password || !name) return
		startTransition(async () => {
			try {
				const res = await signUp({ email, name, password })
				if (!res || typeof res === 'string' || Array.isArray(res))
					toast.error(
						!Array.isArray(res)
							? res || "'Произошла ошибка. Попробуйте позже.'"
							: res[0]
					)
				else {
					router.push('/signin')
					toast.success('Регистрация выполнена!')
				}
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
		})
	}

	return (
		<div className='w-full flex flex-col items-center gap-8'>
			<h2 className='text-2xl'>Регистрация</h2>
			<form className='w-full flex flex-col gap-5' action={handleSubmit}>
				<Input
					required
					name='email'
					type='email'
					label='Почта'
					placeholder='Email'
				/>
				<Input
					required
					name='name'
					type='text'
					label='Название организации'
					placeholder='Ваша организация'
				/>
				<Input
					required
					name='password'
					type='password'
					label='Ваше пароль'
					placeholder='Пароль'
				/>
				<Button type='submit' disabled={isPending}>
					Зарегистрироваться
				</Button>
			</form>
			<div className='w-full flex flex-col items-center	'>
				<SeparatorWithText className={'mb-4'}>или</SeparatorWithText>
				<VkSignInButton type='button' disabled={isPending} className='w-full' />
				<Separator className='mt-8' />
			</div>
			<p>
				Уже зарегистрированы?{' '}
				<Link className='font-semibold' href={'/signin'}>
					Войти
				</Link>
			</p>
		</div>
	)
}

export default SignUpForm
