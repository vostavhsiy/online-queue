import { Advantages } from './ui/advantages'
import { Footer } from './ui/footer'
import { BackForm } from './ui/form'
import { Header } from './ui/header'
import { Intro } from './ui/intro'
import { Steps } from './ui/steps'

const HomeScreen = () => {
	return (
		<main>
			<Header />
			<Intro />
			<Steps />
			<Advantages />
			<BackForm />
			<Footer />
		</main>
	)
}

export default HomeScreen
