import Image from 'next/image'

const AuthLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<div className='flex h-screen'>
			<div className='flex-grow p-10 border-2'>{children}</div>
			<div className='h-full relative bg-white w-3/5'>
				<Image
					src={'/bg.jpg'}
					alt='bg'
					className='absolute top-0 left-0 w-full h-full object-cover'
					width={2140}
					height={939}
				/>
			</div>
		</div>
	)
}

export default AuthLayout
