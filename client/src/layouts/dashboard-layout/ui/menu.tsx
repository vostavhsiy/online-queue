'use client'

import { LogoutButton } from '@/features/logout-button'
import { ThemeButton } from '@/features/theme-button'
import { Theme } from '@fullcalendar/core/internal'
import Link from 'next/link'

export const DashboardMenu = () => {
	return (
		<div className='absolute z-[1] top-2 right-2 flex items-center justify-center gap-3'>
			<Link href={'/'} className='underline text-primary/80 hover:text-primary transition-all'>Главная</Link>
			<ThemeButton />
			<LogoutButton isIcon />
		</div>
	)
}
