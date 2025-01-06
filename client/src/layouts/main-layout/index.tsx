import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			<main className='overflow-hidden'>{children}</main>
			<Footer />
		</>
	)
}

export default MainLayout
