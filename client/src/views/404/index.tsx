import { Logo, Separator } from '@/shared/ui'
import Link from 'next/link'

const NotFoundScreen = () => {
	return (
		<div className='h-screen flex flex-col items-center justify-center'>
			<p className='text-10xl'>404</p>
			<Separator className='w-60 my-10' />
			<div className='flex items-center gap-4'>
				<Logo />
				<Link href={'/'} className='transition-all hover:text-accent text-xl'>На главную</Link>
			</div>
		</div>
	)
}

export default NotFoundScreen
