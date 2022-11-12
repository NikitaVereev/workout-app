import React, { Fragment, useEffect } from 'react'
import Header from '../../common/Header'
import bgImage from '../../images/bg-workouts.jpg'
import { useMutation, useQuery } from 'react-query'
import styles from './Workout.module.sass'
import layoutStyles from '../../common/Layout/Layout.module.sass'
import { $api } from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import cn from 'classnames'

const SingleWorkout = ({ backCallback, height, heading }) => {
	let { id } = useParams()
	const history = useNavigate()

	const { data, isSuccess } = useQuery(
		'get Workout',
		() =>
			$api({
				url: `/workouts/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
		'Change log state',
		() =>
			$api({
				url: '/workouts/log/completed',
				type: 'PUT',
				body: { logId: id },
			}),
		{
			onSuccess() {
				history('/workouts')
			},
		}
	)

	useEffect(() => {
		if (
			isSuccess &&
			data?.exerciseLogs.length ===
				data.exerciseLogs.filter(log => log.completed).length
		) {
			setWorkoutCompleted()
		}
	}, [data?.exerciseLogs])

	return (
		<>
			<div
				className={`${layoutStyles.container} ${layoutStyles.otherPage}`}
				style={{ background: `url(${bgImage})` }}
				heading='Workout'
			>
				<Header backCallback={backCallback} height={height} />
				{isSuccess && (
					<div className={styles.heading}>
						<time className={styles.time}>{data.minutes + ' min.'}</time>
						<h1 className={styles.heading}>{data.workout.name}</h1>
					</div>
				)}
			</div>

			{errorCompleted && <Alert text={errorCompleted} type='error' />}
			{isSuccess ? (
				<div className={styles.wrapperInnerPage}>
					<div className={styles.wrapper}>
						{data.exerciseLogs.map((exLog, idx) => {
							return (
								<Fragment key={`ex log ${idx}`}>
									<div
										className={cn(styles.item, {
											[styles.completed]: exLog.completed,
										})}
									>
										<button
											className={styles.button}
											aria-label='go to exercise'
											onClick={() => history(`/exercise/${exLog._id}`)}
										>
											<span>{exLog.exercise.name}</span>
											<img
												src={`/uploads/${exLog.exercise.imageId}.svg`}
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
