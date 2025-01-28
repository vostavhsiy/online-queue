'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { CircleCheck } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const Man = dynamic(() => import('./man'), { ssr: false })

export const About = () => {
	const container = useRef<HTMLDivElement>(null)
	const items = useRef<HTMLDivElement>(null)
	const itemsContainer = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			const itemsTl = gsap.timeline()

			itemsTl.to('.title', {
				opacity: 1,
				scrollTrigger: {
					scrub: true,
					trigger: '.title',
					start: 'top 80%',
					end: 'top 20%',
				},
			})

			gsap.utils.toArray('.text').forEach((item, index) => {
				itemsTl.to(item as Element, {
					opacity: 1,
					x: 0,
					duration: 3,
					scrollTrigger: {
						scrub: true,
						trigger: item as Element,
						start: 'top 80%',
						end: 'top 20%',
					},
				})
			})

			gsap.utils.toArray('.item').forEach((item, index) => {
				itemsTl.to(item as Element, {
					opacity: 1,
					x: 0,
					duration: 3,
					scrollTrigger: {
						scrub: true,
						trigger: item as Element,
						start: 'top 70%',
						end: 'top 60%',
					},
				})
			})

			const carousel = items.current!
			const container = itemsContainer.current!
			const slides = Array.from(carousel.children)
			const totalSlides = slides.length
			//@ts-ignore
			const slideWidth = slides[0].offsetWidth

			const totalWidth = slideWidth * totalSlides

			gsap.to(container, {
				opacity: 1,
				scrollTrigger: {
					trigger: container,
					toggleActions: 'play pause restart reset',
				},
			})

			const tl = gsap.timeline({ repeat: -1 })

			tl.to(carousel, {
				x: -totalWidth / 2,
				duration: totalSlides,
				ease: 'none',
				modifiers: {
					x: gsap.utils.unitize(x => {
						// Use modulo to create a seamless loop
						return parseFloat(x) % (totalWidth / 2)
					}),
				},
			})

			const updateOpacity = () => {
				const containerWidth = container.offsetWidth
				const carouselX = parseFloat(gsap.getProperty(carousel, 'x') + '')

				Array.from(carousel.children).forEach((slide, index) => {
					const slideX = index * slideWidth + carouselX
					const distanceFromCenter = Math.abs(
						slideX + slideWidth / 2 - containerWidth / 2
					)
					const opacity = Math.max(
						0,
						1 - distanceFromCenter / (containerWidth / 2)
					)
					gsap.set(slide, { opacity })
				})
			}

			gsap.ticker.add(updateOpacity)
		},
		{ scope: container }
	)

	return (
		<div
			ref={container}
			className='container px-8 py-24 flex gap-5 justify-between items-center mx-auto w-3/4'
		>
			<div className='w-1/2'>
				<h2 className='opacity-0 title text-2xl font-semibold mb-4'>
					Устали от хаоса в очереди?
				</h2>
				<p className='opacity-0  text mb-5'>
					Превратите ожидание в{' '}
					<span className='text-accent'>удовольствие для ваших клиентов</span>!
				</p>
				<p className='opacity-0 mb-5 text'>
					С нашим сервисом онлайн-очереди вы:
				</p>
				<ul className='flex flex-col gap-4 mb-5'>
					<li className='opacity-0 -translate-x-3 item text-xl flex items-center gap-2'>
						<CircleCheck />
						<span>
							Упростите{' '}
							<span className='text-accent underline'>запись и управление</span>{' '}
							потоком клиентов.
						</span>
					</li>
					<li className='opacity-0 -translate-x-3 item text-xl flex items-center gap-2'>
						<CircleCheck />
						<span>
							Сократите{' '}
							<span className='text-accent underline'>время ожидания</span> и{' '}
							<span className='text-accent underline'>повысите лояльность</span>
							.
						</span>
					</li>
					<li className='opacity-0 -translate-x-3 item text-xl flex items-start gap-2'>
						<CircleCheck className='mt-[0.1rem]' />
						<span>
							Освободите время для{' '}
							<span className='text-accent underline'>важных задач</span>, пока{' '}
							<span className='text-accent underline'>
								система работает за вас
							</span>
							.
						</span>
					</li>
				</ul>
				<p className='last opacity-0'>
					Ваш бизнес заслуживает идеального порядка! Подключите онлайн-очередь
					уже сегодня и сделайте каждый визит клиента комфортным.
				</p>
			</div>
			<div
				ref={itemsContainer}
				className='w-2/5 h-96 overflow-hidden opacity-0 duration-500'
				style={{
					maskImage:
						'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
				}}
			>
				<div ref={items} className='items h-full flex'>
					{Array(8)
						.fill(0)
						.map((_, idx) => {
							return (
								<div key={idx} className='pr-3 flex-[1_0_25%] h-full '>
									<div className='relative flex items-center justify-center h-full bg-accent rounded'>
										<Man isLight />
									</div>
								</div>
							)
						})}
				</div>
			</div>
		</div>
	)
}

export default About
