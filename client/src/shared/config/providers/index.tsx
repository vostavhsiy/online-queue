'use client'

import { store } from '@/processes/store'
import { SessionProvider } from 'next-auth/react'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from './theme-provider'

interface Props {
	children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
	return (
		<Provider store={store}>
			<SessionProvider>
				<ThemeProvider attribute='class' defaultTheme='light'>
					{children}
				</ThemeProvider>
			</SessionProvider>
		</Provider>
	)
}

export default Providers
