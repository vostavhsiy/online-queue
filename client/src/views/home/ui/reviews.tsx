'use client'

import {
	Card,
	CardContent,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/shared/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const reviewsInfo = [
	{
		text: 'Сервис просто спас наш бизнес! Клиенты больше не ждут в очередях, а записываются онлайн. Это значительно сократило нагрузку на администраторов и повысило удовлетворенность клиентов. Рекомендую всем!',
		name: 'Анна Иванова',
		job: 'Владелец салона красоты',
	},
	{
		text: 'Мы внедрили этот сервис, и уже через неделю заметили, что время ожидания пациентов сократилось на 30%. Интуитивно понятный интерфейс и отличная поддержка. Спасибо за качественный продукт!',
		name: 'Дмитрий Петров',
		job: 'Менеджер медицинского центра',
	},
	{
		text: 'Раньше клиенты ждали своей очереди по несколько часов, теперь всё происходит онлайн. Сервис помог нам упорядочить запись и увеличить количество клиентов. Очень довольны!',
		name: 'Сергей Сидоров',
		job: 'Директор автосервиса',
	},
	{
		text: 'Этот сервис значительно упростил нашу работу. Клиенты записываются на тренировки через сайт, а мы можем сосредоточиться на других задачах. Интеграция заняла всего пару часов. Очень удобно!',
		name: 'Елена Кузнецова',
		job: 'Администратор фитнес-клуба',
	},
	{
		text: 'Мы используем сервис для бронирования столиков. Клиенты в восторге от удобства, а мы — от сокращения количества ошибок в записи. Отличное решение для любого бизнеса!',
		name: 'Алексей Морозов',
		job: 'Владелец ресторана',
	},
	{
		text: 'Сервис помог нам организовать запись на курсы и консультации. Теперь родители и студенты могут выбрать удобное время онлайн, а мы экономим время на административной работе. Очень рекомендую!',
		name: 'Ольга Смирнова',
		job: 'Руководитель образовательного центра',
	},
]

export const Reviews = () => {
	const container = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const tl = gsap.timeline()
		},
		{
			scope: container,
		}
	)

	return (
		<div className='bg-secondary/40 border-t-2'>
			<div
				ref={container}
				className='container px-8 py-20 mx-auto flex items-center justify-center'
			>
				<Carousel className='w-4/5' opts={{ loop: true }}>
					<CarouselContent>
						{reviewsInfo.map((info, index) => (
							<CarouselItem key={index}>
								<div className='p-1 h-full'>
									<Card className='h-full px-8 py-5'>
										<CardContent className='flex flex-col gap-8 justify-between p-6 h-full'>
											<p className='text-2xl'>{info.text}</p>
											<div className='flex flex-col'>
												<p className='text-xl font-[500]'>{info.name}</p>
												<p className='text-lg text-gray-500'>{info.job}</p>
											</div>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	)
}
