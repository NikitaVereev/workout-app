import { useEffect, useState } from 'react'
import Header from '../../common/Header'
import bgImage1 from '../../images/bg-exercise1.jpg'
import bgImage2 from '../../images/bg-exercise2.jpg'
import { useMutation, useQuery } from 'react-query'
import styles from './SingleExercis.module.sass'
import layoutStyles from '../../common/Layout/Layout.module.sass'
import { $api } from '../../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import checkImage from '../../images/check.svg'
import notCheckImage from '../../images/nocheck.svg'
import debounce from 'lodash.debounce'
import cn from 'classnames'

const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.ceil(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercise = ({ backCallback, height, heading }) => {
	let { id } = useParams()
	const history = useNavigate()

	const [bgImage, setBgImage] = useState(bgImage1)

	useEffect(() => {
		setBgImage(getRandomInt(1, 2) === 1 ? bgImage1 : bgImage2)
	}, [])

	const { data, isSuccess, refetch } = useQuery(
		'get Exercise log',
		() =>
			$api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { mutate: changeState, error: errorChange } = useMutation(
		'Change log state',
		({ timeIndex, key, value }) =>
			$api({
				url: '/exercises/log',
				type: 'PUT',
				body: { timeIndex, key, value, logId: id },
				auth: false,
			}),
		{
			onSuccess(data) {
				refetch()
			},
		}
	)
	const { mutate: setExCompleted, error: errorCompleted } = useMutation(
		'Change log state',
		({ timeIndex, key, value }) =>
			$api({
				url: '/exercises/log/completed',
				type: 'PUT',
				body: { logId: id, completed: true },
			}),
		{
			onSuccess(data) {
				history(-1)
			},
		}
	)

	useEffect(() => {
		if (isSuccess) console.log(data.times.filter(time => time.completed))
	}, [data?.times, isSuccess])

	return (
		<>
			<div
				className={`${layoutStyles.container} ${layoutStyles.otherPage}`}
				style={{
					background: `url(${bgImage})`,
				}}
				heading='Workout'
			>
				<Header backCallback={backCallback} height={height} />
				{isSuccess && (
					<div className={styles.headWrapper}>
						<img
							src={`/uploads/${data.exercise.imageId}.svg`}
							height='34'
							alt=''
						/>
						<h1 className={styles.heading}>{data.exercise.name}</h1>
					</div>
				)}
			</div>
			{errorChange && <Alert type='error' text={errorChange} />}
			{isSuccess ? (
				<div className={styles.wrapperInnerPage}>
					<div className={styles.wrapper}>
						<div className={styles.row}>
							<div>
								<span>Previous</span>
							</div>
							<div>
								<span>Repeat & weight</span>
							</div>
							<div>
								<span>Completed</span>
							</div>
						</div>
					</div>
					{data.times.map((item, idx) => (
						<div
							key={`ex ${idx}`}
							className={cn(styles.row, { [styles.completed]: item.completed })}
						>
							<div>
								<input type='number' defaultValue={item.prevWeight} disabled />
								<i>kg/</i>
								<input type='number' defaultValue={item.prevRepeat} disabled />
							</div>
							<div>
								<input
									type='number'
									defaultValue={item.weight}
									onChange={debounce(
										e =>
											e.target.value &&
											changeState({
												timeIndex: idx,
												key: 'weight',
												value: e.target.value,
											}),
										2000
									)}
								/>
								<i>kg/</i>
								<input
									type='number'
									defaultValue={item.repeat}
									onChange={debounce(
										e =>
											e.target.value &&
											changeState({
												timeIndex: idx,
												key: 'repeat',
												value: e.target.value,
											})
									)}
								/>
							</div>
							<div>
								<img
									src={item.completed ? checkImage : notCheckImage}
									className={styles.checkbox}
									alt='completed image'
									onClick={() =>
										changeState({
											timeIndex: idx,
											key: 'completed',
											value: !item.completed,
										})
									}
								/>
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
