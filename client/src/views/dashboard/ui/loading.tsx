import { Skeleton } from '@/shared/ui'

export const DashboardScreenLoading = () => {
	return (
		<div>
			<Skeleton className='h-8 w-[150px] mb-8' />
			<Skeleton className='w-full h-[85vh]' />
		</div>
	)
}
