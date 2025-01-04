'use client'

import { Button } from '@/shared/ui'
import { Check } from 'lucide-react'
import { FC, useRef, useState } from 'react'

interface Props {
	title?: string
	children: string
}

export const Code: FC<Props> = ({ title, children }) => {
	const [isCopy, setIsCopy] = useState(false)

	const btn = useRef<HTMLButtonElement>(null)

	const handleClick = async () => {
		await navigator.clipboard.writeText(children)
		btn.current!.style.opacity = '0'
		setTimeout(() => {
			setIsCopy(true)
			btn.current!.style.opacity = '1'
		}, 100)
		setTimeout(() => {
			btn.current!.style.opacity = '0'
			setTimeout(() => {
				setIsCopy(false)
				btn.current!.style.opacity = '1'
			}, 100)
		}, 3000)
	}

	return (
		<div className='rounded-lg border bg-background'>
			<div className='flex items-center justify-between border-b bg-muted px-4 py-2'>
				<div className='text-sm font-medium'>{title}</div>
				<Button
					ref={btn}
					variant='ghost'
					size='icon'
					className='hover:bg-muted/50 text-muted-foreground transition-all'
					onClick={handleClick}
				>
					{isCopy ? (
						<Check className='w-4 h-4' />
					) : (
						<CopyIcon className='h-4 w-4' />
					)}
					<span className='sr-only'>Copy code</span>
				</Button>
			</div>
			<div className='p-4 font-mono text-sm leading-6 text-foreground'>
				<pre className='language-javascript'>
					<code>{children}</code>
				</pre>
			</div>
		</div>
	)
}

function CopyIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
			<path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
		</svg>
	)
}
