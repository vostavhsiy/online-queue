'use client'

import { cn } from '@/shared/lib'
import { Button, ButtonProps } from '@/shared/ui'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FC, Suspense } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'
import styles from './styles.module.scss'

interface Props extends ButtonProps {
	className?: string
}

const VkSignInButton: FC<Props> = ({ className, ...props }) => {
	const searchParams = useSearchParams()

	const { pending } = useFormStatus()

	const handleClick = () => {
		signIn('vk', {
			callbackUrl: searchParams.get('callbackUrl') || '/',
		}).then(res => {
			res?.ok && toast.success('Вход выполнен!')
			res?.error && toast.error('Произошла ошибка!')
		})
	}

	return (
		<Button
			className={cn(
				styles.button,
				'w-[360px] relative text-white h-[44px] hover:bg-[#1b70c6] bg-[#2688eb]',
				className
			)}
			onClick={handleClick}
			disabled={pending}
			{...props}
		>
			<Image
				className='absolute top-1/2 -translate-y-1/2 left-3'
				src={'/vk.svg'}
				alt='vk'
				width={20}
				height={20}
			/>
			<span className='text-base'>Войти через Вконтакте</span>
		</Button>
	)
}

export default (props: Props) => (
	<Suspense>
		<VkSignInButton {...props} />
	</Suspense>
)
