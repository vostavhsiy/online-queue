'use client'

import { cn } from '@/shared/lib'
import { Button, ButtonProps, useSidebar } from '@/shared/ui'
import { PanelLeft } from 'lucide-react'
import { FC } from 'react'

interface Props extends ButtonProps {}

export const SidebarToggleButton: FC<Props> = props => {
	const { toggleSidebar } = useSidebar()
	return (
		<Button
			variant='ghost'
			size='icon'
			className={cn('h-7 w-7')}
			onClick={event => {
				toggleSidebar()
			}}
			{...props}
		>
			<PanelLeft />
		</Button>
	)
}
