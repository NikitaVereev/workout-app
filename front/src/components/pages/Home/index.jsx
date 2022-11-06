import React from 'react'
import Layout from '../../common/Layout'
import Button from '../../ui/Button/Button'
import Counters from '../../ui/Counters'
import styles from './Home.module.sass'
import bgImage from '../../images/bg1.jpg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useQuery } from 'react-query'
import { $api } from '../../../api/api'

const Home = () => {
	const { isAuth } = useAuth()
	const { data, isSuccess } = useQuery(
		'home page counters',
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
			enabled: isAuth,
		}
	)

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
			{isSuccess && isAuth && (
				<Counters
					minutes={data.minutes}
					workouts={data.workouts}
					kgs={data.kgs}
				/>
			)}
		</Layout>
	)
}

export default Home
