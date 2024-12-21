import Link from 'next/link'

const HomeScreen = () => {
	return (
		<div>
			<h1>HomeScreen</h1>
			<Link href={'/dashboard'}>dashboard</Link>
		</div>
	)
}

export default HomeScreen
