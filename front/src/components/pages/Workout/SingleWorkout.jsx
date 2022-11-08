import React, { Fragment } from 'react'
import Header from '../../common/Header'
import bgImage from '../../images/bg-workouts.jpg'
import { useMutation, useQuery } from 'react-query'
import styles from './Workout.module.sass'
import layoutStyles from '../../common/Layout/Layout.module.sass'
import { $api } from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'

const SingleWorkout = ({ backCallback, height, heading }) => {
	let { id } = useParams()
	const history = useNavigate()

	const { data, isSuccess } = useQuery(
		'get Workout',
		() =>
			$api({
				url: `/workouts/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new exercise log',
		({ exId, times }) =>
			$api({
				url: '/exercises/log',
				type: 'POST',
				body: { exerciseId: exId, times },
			}),
		{
			onSuccess(data) {
				history(`/exercise/${data._id}`)
			},
		}
	)

	return (
		<>
			<div
				className={`${layoutStyles.container} ${layoutStyles.otherPage}`}
				style={{ background: `url(${bgImage})` }}
				heading='Workout'
			>
				<Header backCallback={backCallback} height={height} />
				{isSuccess && (
					<>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={styles.heading}>{data.name}</h1>
					</>
				)}
			</div>
			{error && <Alert type='error' text={error} />}
			{isSuccessMutate && <Alert text='Exercise log create' />}
			{isSuccess ? (
				<div className={styles.wrapperInnerPage}>
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx}`}>
									<div>
										<button
											aria-label='go to exercise'
											onClick={() =>
												mutate({
													exId: ex._id,
													times: ex.times,
												})
											}
										>
											<span>{ex.name}</span>
											<img
												src={`/uploads/${ex.imageId}.svg`}
												height='34'
												alt=''
											/>
										</button>
									</div>
									{idx % 2 !== 0 && <div className={styles.line}></div>}
								</Fragment>
							)
						})}
					</div>
				</div>
			) : (
				<Alert type='error' text='Exercises not ' />
			)}
		</>
	)
}

export default SingleWorkout
