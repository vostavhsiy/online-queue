'use client'

import { cn } from '@/shared/lib'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Fragment, useRef } from 'react'

const steps = [
	{
		label: 'Создайте аккаунт',
		text: 'Пройдите простую регистрацию за минуту и сразу же начните пользоваться сервисом!',
		image: '/reg.png',
	},
	{
		label: 'Добавьте ваши услуги',
		text: 'В панели управления во вкладке "Мероприятия" создайте проводимые вами мероприятия оказание услуг, не забудьте добавить к ним расписание!',
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

	useGSAP(
		() => {
			const rootStyles = getComputedStyle(document.documentElement)
			const hslValue = rootStyles.getPropertyValue('--accent').trim()
			const tl = gsap.timeline()
			tl.to('.title', {
				y: 0,
				opacity: 1,
				scrollTrigger: {
					trigger: container.current,
					start: 'top-=40%',
					toggleActions: 'play none none reset',
				},
			})
				.to('.subtitle', {
					y: 0,
					opacity: 1,
					scrollTrigger: {
						trigger: container.current,
						start: 'top-=30%',
						toggleActions: 'play none none reset',
					},
				})
				.to('.line', {
					height: '100%',
					background: `hsl(${hslValue})`,
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
					scrollTrigger: {
						trigger: '.line-container',
						start: 'top-=50%',
						scrub: true,
					},
				})
			gsap.utils.toArray('.step').forEach((item, index) => {
				tl.to(item as Element, {
					opacity: 1,
					x: 0,
					duration: 3,
					scrollTrigger: {
						scrub: true,
						trigger: item as Element,
						start: 'top 80%',
						end: 'top 50%',
					},
				})
			})
			gsap.utils.toArray('.point').forEach((item, index) => {
				tl.to(item as Element, {
					opacity: 1,
					scale: 3,
					scrollTrigger: {
						scrub: true,
						trigger: item as Element,
						start: 'top 80%',
						end: 'top 20%',
					},
				})
			})
		},
		{ scope: container }
	)

	return (
		<div className='bg-secondary/40 border-t-2'>
			<div ref={container} className='container px-8 pt-20 mx-auto'>
				<p className='title transition-all duration-1000 opacity-0 text-center text-3xl mb-5'>
					Начните использовать сервис за 6 простых шагов
				</p>
				<p className='subtitle opacity-0 transition-all duration-1000 text-center text-lg text-gray-500 mb-10 max-w-3xl mx-auto'>
					Подключите наш сервис онлайн-записи и управления очередью всего за
					несколько минут. Простая интеграция, понятный интерфейс и мгновенный
					результат помогут вам оптимизировать работу с клиентами и повысить
					эффективность бизнеса. Начните уже сегодня и убедитесь, как это легко!
				</p>
				<div ref={inner} className='relative py-32 pt-10 flex gap-20'>
					<div className='line-container absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full'>
						<div className='line w-full bg-primary h-0 rounded-lg'></div>
					</div>
					<div className='w-1/2 flex flex-col items-end'>
						{steps.slice(0, steps.length / 2).map((step, index) => {
							return (
								<Fragment key={step.label}>
									<div
										className={cn('w-4/5 step opacity-0 -translate-x-5 h-32')}
										key={step.label}
									>
										<div className='w-fit p-5 border-b text-end'>
											<p className='text-2xl mb-3 font-[500]'>{step.label}</p>
											<p className='text-base text-gray-500'>{step.text}</p>
										</div>
									</div>
									<div className='h-36'></div>
								</Fragment>
							)
						})}
					</div>
					<div className='w-1/2 mt-32 flex flex-col items-start'>
						{steps.slice(steps.length / 2).map((step, index) => {
							return (
								<Fragment key={step.label}>
									{index > 0 && <div className='h-36'></div>}
									<div
										className={cn('w-4/5 step opacity-0 translate-x-5 h-32')}
										key={step.label}
									>
										<div className='w-fit p-5 border-b'>
											<p className='text-2xl mb-3 font-[500]'>{step.label}</p>
											<p className='text-base text-gray-500'>{step.text}</p>
										</div>
									</div>
								</Fragment>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
