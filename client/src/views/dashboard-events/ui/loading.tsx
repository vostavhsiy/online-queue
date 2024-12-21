import { Skeleton } from '@/shared/ui'

export const DashboardEventsScreenLoading = () => {
	return (
		<div className='flex flex-col gap-4'>
			<Skeleton className='w-[200px] h-9' />
			<Skeleton className='w-[180px] h-9' />
			{Array(3)
				.fill(0)
				.map((_, index) => {
					return (
						<Skeleton key={index} className='p-5 shadow border rounded'>
							<div className='mb-3 flex items-start gap-3 justify-between'>
								<Skeleton className='w-[100px] h-8' />
								<div className='flex items-center gap-3'>
									<Skeleton className='w-[150px] h-9' />
								</div>
							</div>
							<Skeleton className='w-[80px] h-7' />
						</Skeleton>
					)
				})}
		</div>
	)
}
