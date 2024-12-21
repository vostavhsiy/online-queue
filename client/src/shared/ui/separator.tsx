'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

import { cn } from '@/shared/lib/utils'

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = 'horizontal', decorative = true, ...props },
		ref
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				'shrink-0 bg-border',
				orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
				className
			)}
			{...props}
		/>
	)
)
Separator.displayName = SeparatorPrimitive.Root.displayName

const SeparatorWithText = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn('w-full flex justify-center items-center gap-4', className)}
		>
			<Separator className='shrink' />
			<span className='text-muted-foreground block shrink-0'>{children}</span>
			<Separator className='shrink' />
		</div>
	)
}

export { Separator, SeparatorWithText }
