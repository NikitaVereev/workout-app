import React from 'react'

import bgImage from '../../images/bg-workouts.jpg'
import { useMutation, useQuery } from 'react-query'
import styles from './Workout.module.sass'
import { $api } from '../../../api/api'
import Alert from '../../ui/Alert/Alert'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'

const ListWorkouts = ({ backCallback }) => {
	const history = useNavigate()
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

	const {
		mutate: createWorkoutLog,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new workout log',
		({ workoutId }) =>
			$api({
				url: '/workouts/log',
				type: 'POST',
				body: { workoutId },
			}),
		{
			onSuccess(data) {
				history(`/workouts/${data._id}`)
			},
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
								<button
									aria-label='Create new workout'
									onClick={() =>
										createWorkoutLog({
											workoutId: workout._id,
										})
									}
									className={styles.button}
								>
									<span>{workout.name}</span>
								</button>
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
