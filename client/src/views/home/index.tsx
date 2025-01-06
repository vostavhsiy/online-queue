import { About } from './ui/about'
import { Advantages } from './ui/advantages'
import { BackForm } from './ui/form'
import { Intro } from './ui/intro'
import { Steps } from './ui/steps'

const HomeScreen = () => {
	return (
		<>
			<Intro />
			<About />
			<Steps />
			<Advantages />
			<BackForm />
		</>
	)
}

export default HomeScreen
