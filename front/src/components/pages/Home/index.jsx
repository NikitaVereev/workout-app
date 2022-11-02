import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters'
import styles from './Home.module.sass'
import bgImage from '../../images/bg1.jpg'

const Home = () => {
	return (
		<Layout height='100%' bgImage={bgImage}>
			<Button style='main' text={'New'} callback={() => {}} />
			<h1>EXERCISES FOR THE SHOULDERS</h1>
			<Counters />
		</Layout>
	)
}

export default Home
