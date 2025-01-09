'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const advantages = [
	{
		title: 'Оптимизация рабочего процесса',
		text: 'Онлайн-очередь помогает бизнесу эффективно распределять нагрузку на сотрудников, избегая перегрузок в пиковые часы. Это позволяет улучшить качество обслуживания и повысить производительность.',
	},
	{
		title: 'Увеличение лояльности клиентов',
		text: 'Удобство онлайн-записи и отсутствие необходимости долго ждать в очереди повышает удовлетворенность клиентов. Это способствует формированию положительного имиджа компании и увеличению числа постоянных клиентов.',
	},
	{
		title: 'Сбор и анализ данных',
		text: 'Сервис онлайн-очереди позволяет собирать данные о поведении клиентов: популярное время записи, среднее время ожидания, частота посещений. Эти данные помогают бизнесу принимать informed решения и улучшать сервис.',
	},
	{
		title: 'Снижение издержек',
		text: 'Автоматизация процесса записи и управления очередями сокращает необходимость в дополнительном персонале для организации очередей. Это снижает операционные расходы и повышает рентабельность бизнеса.',
	},
]

export const Advantages = () => {
	const container = useRef<HTMLDivElement>(null)
	const inner = useRef<HTMLDivElement>(null)
	const itemsContainer = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			gsap.to('.title', {
				translateX: '-50%',
				opacity: 1,
				scrollTrigger: {
					trigger: container.current,
					start: 'top-=40%',
					toggleActions: 'play none none reset',
				},
			})
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: inner.current,
					pin: true,
					scrub: true,
					end: 'bottom+=800%',
				},
			})
			tl.to(itemsContainer.current, {
				xPercent: -60,
				duration: 10,
			}).to('.line', {
				width: '100%',
				duration: 3,
			})
		},
		{ scope: container }
	)

	return (
		<div ref={container}>
			<div
				ref={inner}
				className='relative bg-accent h-screen flex items-center overflow-hidden'
			>
				<p className='title absolute top-32 left-1/2 -translate-x-10 text-3xl text-background opacity-0'>
					Почему вы должны использовать онлайн-записи
				</p>
				<div className='line rounded-lg absolute top-1/2 left-0 -translate-y-1/2 h-2 bg-background w-1/4'></div>
				<div ref={itemsContainer} className='px-12 flex w-max gap-20'>
					{advantages.map(adv => {
						return (
							<div
								className='w-[40vw] min-h-60 px-8 py-5 bg-background rounded'
								key={adv.title}
							>
								<p className='text-3xl'>{adv.title}</p>
								<p className='text-lg mt-5'>{adv.text}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
