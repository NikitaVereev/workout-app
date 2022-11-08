import React from 'react'

import bgImage from '../../images/bg-workouts.jpg'
import { useQuery } from 'react-query'
import styles from './Workout.module.sass'
import { $api } from '../../../api/api'

import Alert from '../../ui/Alert/Alert'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'

const ListWorkouts = ({ backCallback, height, heading }) => {
	const { data, isSuccess } = useQuery(
		'get Workouts',
		() =>
			$api({
				url: `/workouts`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<>
			<Layout
				bgImage={bgImage}
				heading='Workouts list'
				backCallback={backCallback}
			/>
			{isSuccess ? (
				<div className={styles.wrapperInnerPage}>
					<div className={styles.wrapper}>
						{data.map((workout, idx) => (
							<div key={`ex ${idx}`}>
								<Link to={`/workouts/${workout._id}`}>
									<span>{workout.name}</span>
								</Link>
							</div>
						))}
					</div>
				</div>
			) : (
				<Alert type='error' text='Workouts not ' />
			)}
		</>
	)
}

export default ListWorkouts
