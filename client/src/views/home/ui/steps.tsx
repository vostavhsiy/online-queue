'use client'

import { cn } from '@/shared/lib'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRef } from 'react'

const steps = [
	{
		label: 'Создайте аккаунт',
		text: 'Пройдите простую регистрацию за минуту и сразу же начните пользоваться сервисом!',
		image: '/reg.png',
	},
	{
		label: 'Добавьте ваши услуги',
		text: 'В панели управления во вкладке "Мероприятия" создайте проводимые вами мероприятия оказание услуг, не забудте добавить к ним расписание!',
		image: '/event.png',
	},
	{
		label: 'Настройте шаблон виджета',
		text: 'В панели управления во вкладке "Виджет" вы можете отредактировать внешний вид виджета, с помощью которого желающие смогут записаться на прием!',
		image: '/widget.png',
	},
	{
		label: 'Настройте шаблоны писем',
		text: 'В панели управления во вкладке "Письма" вы можете отредактировать внешний вид писем, которые приходят записавшимся на почту при записи или ее отмене!',
		image: '/mail.png',
	},
	{
		label: 'Следите за расписанием через календарь',
		text: 'В панели управления во вкладке "Расписание" вы можете смотреть будушие записи в удобном виде, а также при необходимости добавлять новые записи прямо в каледаре!',
		image: '/mail.png',
	},
	{
		label: 'Встройте свой виджет на сайт',
		text: 'В панели управления во вкладке "Встраивание" скопируйте код и добавьте к себе на страницу!',
		image: '/code.png',
	},
] as const

export const Steps = () => {
	const container = useRef<HTMLDivElement>(null)
	const inner = useRef<HTMLDivElement>(null)
	const timeline = useRef<HTMLDivElement>(null)
	const stepsContainer = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const tl = gsap.timeline()
			tl.to('.step', {
				opacity: 1,
				x: 0,
				stagger: 0.4,
				scrollTrigger: {
					scrub: true,
					trigger: stepsContainer.current,
					end: 'bottom-=25%',
				},
			}).to('.point', {
				opacity: 1,
				scale: 3,
				stagger: 1,
				scrollTrigger: {
					scrub: true,
					trigger: stepsContainer.current,
					end: 'bottom-=25%',
				},
			})
		},
		{ scope: container }
	)

	return (
		<div ref={container} className='container mx-auto'>
			<div ref={inner} className='flex overflow-hidden'>
				<div ref={timeline} className='w-[12.5%] flex justify-end'>
					<div className='h-full w-2 bg-primary'></div>
				</div>
				<div className='w-[12.5%]'>
					{Array(steps.length)
						.fill(0)
						.map((_, index) => {
							return (
								<div key={index} className='h-screen flex items-center'>
									<div className='h-1/2'>
										<span className='flex w-8 aspect-square rounded-full justify-center items-center -translate-x-1/2 point bg-primary text-background scale-0'>
											{index + 1}
										</span>
									</div>
								</div>
							)
						})}
				</div>
				<div ref={stepsContainer} className='w-3/4'>
					{steps.map((step, index) => {
						return (
							<div
								className={cn(
									'step h-screen opacity-0 translate-x-1/2 flex items-center justify-start gap-12',
									index % 2 == 1 && 'flex-row-reverse justify-end'
								)}
								key={step.label}
							>
								<div className='p-5 w-1/2 h-1/2 rounded border border-primary'>
									<p className='text-3xl mb-5'>{step.label}</p>
									<p className='text-lg'>{step.text}</p>
								</div>
								<Image
									className='w-1/3 border rounded'
									src={step.image}
									alt='step'
									width={500}
									height={500}
								/>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
