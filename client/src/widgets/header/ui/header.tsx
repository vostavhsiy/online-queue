'use client'
import { ThemeButton } from '@/features/theme-button'
import { cn, useAuth } from '@/shared/lib'
import { Logo } from '@/shared/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Link from 'next/link'
import { useRef } from 'react'

export const Header = () => {
	const { company, status } = useAuth()

	const container = useRef<HTMLDivElement>(null)
	const inner = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.to(container.current, {
				opacity: 1,
				ease: 'power1.in',
				delay: 1,
			})
		},
		{ scope: container }
	)

	return (
		<header
			ref={container}
			className='opacity-0 fixed w-full	top-0 left-0 z-[1] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center text-primary'
		>
			<div
				ref={inner}
				className={cn('container px-8 py-2 flex items-center justify-between')}
			>
				<Logo />
				<div className='flex items-center gap-3'>
					<Link
						href={'/privacy'}
						className='text-sm mr-8 transition-all text-primary/60 hover:text-accent'
					>
						Политика конфиденциальности
					</Link>
					<ThemeButton />
					<div>
						{status === 'fullfield' && company ? (
							<div className='flex flex-col'>
								<Link
									href={'/dashboard'}
									className='hover:text-accent transition-all'
								>
									Панель управления
								</Link>
								<p className='text-[0.8rem]'>
									Компания <span className='underline'>{company.name}</span>
								</p>
							</div>
						) : (
							<Link
								className='hover:text-accent transition-all'
								href={'/signin'}
							>
								Войти
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	)
}
