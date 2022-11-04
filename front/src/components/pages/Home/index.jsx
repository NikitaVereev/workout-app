import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters'
import styles from './Home.module.sass'
import bgImage from '../../images/bg1.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	const history = useNavigate()
	return (
		<Layout className={styles.container} bgImage={bgImage}>
			<Button
				style='main'
				text={'New'}
				callback={() => {
					history('/newpage')
				}}
			/>

			<h1 className={styles.title}>EXERCISES FOR THE SHOULDERS</h1>
			<Counters />
		</Layout>
	)
}

export default Home
