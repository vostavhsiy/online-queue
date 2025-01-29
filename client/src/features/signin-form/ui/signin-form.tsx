'use client'

import { Button, Input, Separator, SeparatorWithText } from '@/shared/ui'
import { VkSignInButton } from '@/widgets/vk-signin-button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useTransition } from 'react'
import { toast } from 'sonner'

const SignInForm = () => {
	const searchParams = useSearchParams()

	const [isPending, startTransition] = useTransition()

	const handleSubmit = (data: FormData) => {
		const email = data.get('email')?.toString()
		const password = data.get('password')?.toString()
		if (!email || !password) return
		startTransition(async () => {
			try {
				const res = await signIn('credentials', {
					email,
					password,
					callbackUrl: searchParams.get('callbackUrl') || '/',
				})
				console.log(res)
				res?.ok && toast.success('Вход выполнен!')
			} catch (error) {
				//@ts-ignore
				toast.error(error.message)
			}
		})
	}

	useEffect(() => {
		if (searchParams.get('error'))
			toast.error('Неправильный логин или пароль!', {
				duration: Infinity,
			})
	}, [])

	return (
		<div className='w-full flex flex-col items-center gap-8'>
			<h2 className='text-2xl'>Вход</h2>
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
					name='password'
					type='password'
					label='Ваше пароль'
					placeholder='Пароль'
				/>
				<label className='flex items-center gap-3'>
					<span className='block shrink-0 text-sm opacity-90 select-none'>
						Запомнить вход
					</span>
					<Input type='checkbox' className='w-5 h-auto aspect-square' />
				</label>
				<Button type='submit' disabled={isPending}>
					Войти
				</Button>
			</form>
			<div className='w-full flex flex-col items-center	'>
				<SeparatorWithText className={'mb-4'}>или</SeparatorWithText>
				<VkSignInButton type='button' disabled={isPending} className='w-full' />
				<Separator className='mt-8' />
			</div>
			<p>
				Первый раз?{' '}
				<Link className='font-semibold' href={'/signup'}>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	)
}

export default () => (
	<Suspense>
		<SignInForm />
	</Suspense>
)
