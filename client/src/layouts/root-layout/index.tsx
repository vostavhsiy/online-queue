import '@/app/globals.scss'
import { Providers } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Toaster } from '@/shared/ui'
import { Roboto_Condensed } from 'next/font/google'

const roboto_condensed = Roboto_Condensed({
	weight: ['400', '500', '600', '700', '900'],
	subsets: ['cyrillic', 'latin'],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru' suppressHydrationWarning>
			<body className={cn('bg-background', roboto_condensed.className)}>
				<Providers>{children}</Providers>
				<Toaster position='top-right' richColors closeButton theme='light' />
			</body>
		</html>
	)
}
