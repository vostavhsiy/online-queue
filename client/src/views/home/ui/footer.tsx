import { Logo } from '@/shared/ui'

export const Footer = () => {
	return (
		<footer className='py-5 border-t'>
			<div className='mx-auto px-8 container flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<Logo />
					<span>Онлайн очередь</span>
				</div>
				<div>
					<p>
						© {new Date().getFullYear()} Онлайн очередь. Все права защищены.
					</p>
				</div>
			</div>
		</footer>
	)
}
