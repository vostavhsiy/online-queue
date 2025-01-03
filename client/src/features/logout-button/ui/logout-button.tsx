'use client'

import { Button } from '@/shared/ui'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { FC, useTransition } from 'react'

interface Props {
	isIcon?: boolean
}

const LogoutButton: FC<Props> = ({ isIcon }) => {
	const [isPending, startTransition] = useTransition()

	const handleClick = () => {
		startTransition(() => signOut({ callbackUrl: '/' }))
	}

	return (
		<Button
			type='button'
			size={isIcon ? 'icon' : 'default'}
			variant={'outline'}
			disabled={isPending}
			onClick={handleClick}
		>
			{isIcon ? <LogOut className='h-[1.2rem] w-[1.2rem]' /> : 'Выйти'}
		</Button>
	)
}

export default LogoutButton
