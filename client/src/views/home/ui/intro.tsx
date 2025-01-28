'use client'

import { ContactsLinks } from '@/features/contacts-links'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TextPlugin from 'gsap/TextPlugin'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const Man = dynamic(() => import('./man'), { ssr: false })
const ScrollIcon = dynamic(() => import('./scroll-icon'), { ssr: false })

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const introContent = {
	title: 'Онлайн очередь',
}

export const Intro = () => {
	const { theme } = useTheme()
	const [isDarkTheme, setIsDarkTheme] = useState(theme === 'dark')

	const container = useRef<HTMLDivElement>(null)
	const title = useRef<HTMLHeadingElement>(null)
	const circle = useRef<HTMLDivElement>(null)
	const scrollIcon = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsDarkTheme(theme === 'dark')
	}, [theme])

	useGSAP(
		() => {
			const tl = gsap.timeline()
			tl.to('.title', {
				opacity: 1,
				x: 0,
			})
				.to('.subtitle', {
					opacity: 1,
				})
				.to('.intro-button', {
					opacity: 1,
				})
				.to(circle.current, {
					opacity: 1,
					scale: 1.1,
					border: 5,
					yoyo: true,
				})
				.to(circle.current, {
					scale: 1,
					border: 2,
				})
				.to(title.current, {
					duration: 1,
					opacity: 1,
					text: {
						value: introContent.title,
					},
				})
				.to('.door', {
					opacity: 1,
				})
				.to(title.current, {
					background: isDarkTheme ? '#fff' : '#000',
					color: isDarkTheme ? '#000' : '#fff',
				})
				.to(container.current, {
					// background: isDarkTheme ? '#fff' : '#000',
					scrollTrigger: {
						scrub: 2,
					},
				})
				.to(circle.current, {
					yPercent: -15,
					scrollTrigger: {
						scrub: true,
					},
				})
				.fromTo(
					scrollIcon.current,
					{ opacity: 1, y: 0 },
					{
						opacity: 0,
						yPercent: 30,
						scrollTrigger: {
							trigger: container.current,
							start: 'top+=10%',
							end: 'bottom-=40%',
							scrub: 1,
						},
					}
				)
				.to('.ball', {
					rotate: index => (8 - index) * 5 + 360 + 130,
					stagger: 2,
					duration: 10,
					repeat: -1,
				})
		},
		{ scope: container, dependencies: [isDarkTheme], revertOnUpdate: true }
	)

	return (
		<div
			ref={container}
			className='relative h-screen max-h-[1000px] bg-secondary/40 border-b'
		>
			<div className='relative container px-8 mx-auto h-full flex items-center justify-center'>
				<div className='w-1/3'>
					<p className='opacity-0 -translate-x-20 title text-4xl font-[500] leading-[1.5] mb-8'>
						Сократите очереди, повысьте лояльность и прибыль
					</p>
					<p className='opacity-0 subtitle text-lg text-gray-500 mb-8'>
						Наш сервис автоматизирует процессы записи и управления очередью,
						сокращая время ожидания и улучшая клиентский опыт. Интегрируйте
						решение в вашу текущую систему и начните работать эффективнее уже
						сегодня.
					</p>
					<Button
						asChild
						size={'lg'}
						variant={'primary'}
						className='opacity-0 intro-button text-lg h-auto py-3'
					>
						<Link href={'/dashboard'}>Начните сейчас</Link>
					</Button>
				</div>
				<div className='w-1/2 relative flex items-center justify-center h-full'>
					<div
						ref={circle}
						className='absolute opacity-0 scale-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 aspect-square rounded-full border-2 border-primary'
					>
						<div className='door z-[1] opacity-0 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-4 h-8 skew-y-12 bg-primary'>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-3 h-7 -skew-y-[40deg] bg-accent'></div>
						</div>
						{Array(8)
							.fill(0)
							.map((_, index) => {
								return (
									<div
										key={index}
										className={cn(
											'ball absolute w-full h-full top-0 left-0 rounded-full border-2 border-primary'
										)}
										style={{ transform: `rotate(${(8 - index) * 5 + 130}deg)` }}
									>
										<div className='absolute w-5 aspect-square bottom-0 left-1/2 -translate-x-1/2 translate-y-5	 rotate-180	'>
											<Man />
										</div>
									</div>
								)
							})}
					</div>
					<h1
						ref={title}
						className='relative opacity-0 p-4 text-7xl tracking-wider text-primary'
					></h1>
				</div>
				<div
					ref={scrollIcon}
					className='absolute w-10 bottom-3 left-1/2 -translate-x-1/2 translate-y-5'
				>
					<div
						className='opacity-0 animate-fade'
						style={{ animationDelay: '3000ms' }}
					>
						<div className='animate-bounce delay-200'>
							<ScrollIcon />
						</div>
					</div>
				</div>
				<div className='absolute bottom-8 left-8'>
					<ContactsLinks />
				</div>
			</div>
		</div>
	)
}
