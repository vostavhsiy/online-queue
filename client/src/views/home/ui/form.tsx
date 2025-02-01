'use client'

import { ContactsLinks } from '@/features/contacts-links'
import { Button, Input, Textarea } from '@/shared/ui'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export const BackForm = () => {
	const container = useRef<HTMLDivElement>(null)

	const [pending, setPending] = useState(false)

	useGSAP(
		() => {
			const tl = gsap.timeline()
			tl.to('.title', {
				opacity: 1,
				x: 0,
				scrollTrigger: {
					trigger: '.title',
				},
			})
				.to('.form', {
					opacity: 1,
					y: 0,
					scrollTrigger: {
						trigger: '.form',
						toggleActions: 'play pause restart reset',
					},
				})
				.to('.contacts', {
					opacity: 1,
					scrollTrigger: {
						trigger: '.contacts',
						toggleActions: 'play pause restart reset',
					},
				})
		},
		{ scope: container }
	)

	const handleSubmit = (data: FormData) => {
		setPending(true)
		setTimeout(() => {
			setPending(false)
			toast.success('Сообщение успешно отправлено', {
				description: 'Спасибо за обратную связь. В ближайшее время мы свяжемся с вами!',
			})
		}, 1000)
	}

	return (
		<div className='bg-secondary/40' id='contacts'>
			<div
				ref={container}
				className='container mx-auto flex items-center justify-center'
			>
				<div className={'py-20 w-4/5 mx-auto overflow-hidden'}>
					<h3
						className={
							'title opacity-0 transition-all duration-500 -translate-x-5 text-center mb-6 text-4xl font-semibold text-primary'
						}
					>
						Контакты
					</h3>
					<div
						className={
							'flex flex-row-reverse items-stretch p-3 rounded-xl border-2 bg-white dark:bg-background'
						}
					>
						<div
							className={
								'contacts opacity-0 transition-opacity duration-1000 delay-200 relative overflow-hidden w-2/5 bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-primary px-6 py-8 rounded-xl  text-background'
							}
						>
							<h3 className={'mb-3 text-2xl font-semibold'}>
								Контактная информация
							</h3>
							<p className={'mb-32 text-lg text-background/80'}>
								Вы можете связаться с нами по любым вопросам!
							</p>
							<div className={'mb-32 flex flex-col gap-5 font-semibold'}>
								<a
									href={'tel:+79517735345'}
									className={'flex items-center gap-4'}
								>
									<Phone />
									<span>+7 951 773 53 45</span>
								</a>
								<a
									href={'mailto:ivtipt@sfedu.ru'}
									className={'flex items-center gap-4'}
								>
									<Mail />
									<span>onlinequeue@mail.ru</span>
								</a>
								<div className={'flex items-center gap-4'}>
									<MapPin />
									<span>г. Ростов-на-Дону, ул. Б. Садовая, 10</span>
								</div>
							</div>
							<ContactsLinks />
							<div
								className={
									'ball absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-[60%] aspect-square rounded-full bg-black/20'
								}
							></div>
							<div
								className={
									'ball absolute right-0 bottom-0 -translate-x-1/2 -translate-y-1/3 w-[25%] aspect-square rounded-full bg-black/30'
								}
							></div>
						</div>
						<div
							className={
								'form transition-all duration-1000 delay-100 opacity-0 translate-y-8 w-3/5 px-16 pt-10'
							}
						>
							<p className='text-center text-primary text-2xl mb-10'>
								Обратная связь
							</p>
							<form
								action={handleSubmit}
								className='flex flex-col items-center gap-5'
							>
								<Input
									name='name'
									type='text'
									placeholder='Ваше имя'
									required
								/>
								<Input
									name='email'
									type='email'
									placeholder='Ваш почтовый ящик'
									required
								/>
								<Textarea
									name='text'
									className='min-h-56'
									placeholder='Ваше послание'
									required
								/>
								<Button disabled={pending} className='w-1/3' type='submit'>
									Отправить
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
