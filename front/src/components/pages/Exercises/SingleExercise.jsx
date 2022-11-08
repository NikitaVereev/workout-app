import React, { Fragment } from 'react'
import Header from '../../common/Header'
import bgImage1 from '../../images/bg-exercise1.jpg'
import bgImage2 from '../../images/bg-exercise2.jpg'
import { useQuery } from 'react-query'
import styles from './SingleExercis.module.sass'
import layoutStyles from '../../common/Layout/Layout.module.sass'
import { $api } from '../../../api/api'
import { useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'

const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.ceil(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercise = ({ backCallback, height, heading }) => {
	let { id } = useParams()

	const { data, isSuccess } = useQuery(
		'get Exercise log',
		() =>
			$api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	console.log(getRandomInt(1, 2))

	return (
		<>
			<div
				className={`${layoutStyles.container} ${layoutStyles.otherPage}`}
				style={{
					background: `url(${getRandomInt(1, 2) === 1 ? bgImage1 : bgImage2})`,
				}}
				heading='Workout'
			>
				<Header backCallback={backCallback} height={height} />
				{isSuccess && (
					<div>
						<img
							src={`/uploads/${data.exercise.imageId}.svg`}
							height='34'
							alt=''
						/>
						<h1 className={styles.heading}>{data.exercise.name}</h1>
					</div>
				)}
			</div>
			{isSuccess ? (
				<div className={styles.wrapperInnerPage}>
					<div className={styles.wrapper}>
						<div className='row'>
							<div>
								<span>Previous</span>
							</div>
							<div>
								<span>Repeat</span>
							</div>
							<div>
								<span>Completed</span>
							</div>
						</div>
					</div>
					{data.times.map((item, idx) => (
						<div key={`ex ${idx}`}>
							<div>
								<input type='text' />
								<i>/</i>
							</div>
						</div>
					))}
				</div>
			) : (
				<Alert type='error' text='Times not ' />
			)}
		</>
	)
}

export default SingleExercise
