import { Logo } from '@/shared/ui'
import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className='py-5 border-t'>
			<div className='mx-auto px-8 container flex items-center justify-between'>
				<Logo />
				<div className='flex items-center'>
					<Link
						href={'/#contacts'}
						className='text-sm mr-8 transition-all text-primary/60 hover:text-accent'
					>
						Обратная связь
					</Link>
					<Link
						href={'/privacy'}
						className='text-sm mr-8 transition-all text-primary/60 hover:text-accent'
					>
						Политика конфиденциальности
					</Link>
					<p>
						© {new Date().getFullYear()} Онлайн очередь. Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}
