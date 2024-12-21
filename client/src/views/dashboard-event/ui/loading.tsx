import { Skeleton } from '@/shared/ui'

export const DashboardEventScreenLoading = () => {
	return (
		<div className='h-full flex flex-col'>
			<div className='mb-10 flex items-start gap-3 justify-between'>
				<div className='flex items-end gap-3'>
					<Skeleton className='w-[200px] h-10' />
					<Skeleton className='w-[80px] h-7' />
				</div>
			</div>
			<div className='mb-5'>
				<Skeleton className='mb-2 w-[100px] h-8' />
				<div className='grid grid-cols-auto-fill-300 gap-5'>
					{Array(3)
						.fill(0)
						.map((_, index) => {
							return (
								<Skeleton
									key={index}
									className='relative p-3 rounded flex flex-col gap-1'
								>
									<Skeleton className='h-6 w-[80px]' />
									<Skeleton className='h-6 w-[60px]' />
									<Skeleton className='h-6 w-[120px]' />
									<Skeleton className='absolute h-9 w-9 top-3 right-3' />
								</Skeleton>
							)
						})}
				</div>
			</div>
			<div className='flex-1 flex items-end justify-end'>
				<div className='flex items-center gap-3'>
					<Skeleton className='w-[70px] h-9' />
					<Skeleton className='w-[120spx] h-9' />
				</div>
			</div>
		</div>
	)
}
