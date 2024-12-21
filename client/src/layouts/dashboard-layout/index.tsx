import { SidebarProvider } from '@/shared/ui'
import { DashboardMenu, DashboardSidebar, SidebarToggleButton } from './ui'

const DashboardLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<SidebarProvider>
			<DashboardMenu />
			<DashboardSidebar />
			<main className='relative w-full p-10 min-h-screen'>
				<SidebarToggleButton className='absolute top-2 left-2' />
				{/* <SidebarTrigger /> */}
				{children}
			</main>
		</SidebarProvider>
	)
}

export default DashboardLayout
