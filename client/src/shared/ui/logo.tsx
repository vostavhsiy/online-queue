import Link from 'next/link'

export const Logo = () => {
	return (
		<Link href={'/'} className='flex items-center gap-3'>
			<div className='relative p-1'>
				<span className='relative z-[1] text-2xl font-semibold text-background'>
					Оо
				</span>
				<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary w-full h-full skew-x-12 skew-y-12 rounded-sm'></div>
			</div>
			<span>Онлайн очередь</span>
		</Link>
	)
}
