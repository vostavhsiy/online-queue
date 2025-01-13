import { Skeleton } from '@/shared/ui'

export const DashboardScheduleScreenLoading = () => {
	return (
		<div>
			<Skeleton className='h-8 w-[150px] mt-5 mb-8' />
			<Skeleton className='w-full h-[85vh]' />
		</div>
	)
}
