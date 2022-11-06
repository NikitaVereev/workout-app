import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cn from 'classnames'
import Layout from '../../common/Layout'
import bgImage from '../../images/bg-exercise.jpg'
import styles from './NewPage.module.sass'
import Search from '../../ui/Search/Search'
import Button from '../../ui/Button/Button'
import { useMutation } from 'react-query'
import { $api } from '../../../api/api'
import Alert from '../../ui/Alert/Alert'

const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit']

const NewExercise = ({ height, backCallback }) => {
	const history = useNavigate()

	backCallback = () => history(-1)

	const [name, setName] = React.useState('')
	const [times, setTimes] = React.useState(0)
	const [imageId, setImageId] = React.useState('')

	const { isSuccess, mutate, error } = useMutation(
		'Create New Exercise',
		() =>
			$api({
				url: '/exercises',
				type: 'POST',
				body: { name, times, imageId },
			}),
		{
			onSuccess(data) {
				setName('')
				setTimes('')
				setImageId('')
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()
		if (name && times && imageId) mutate()
	}

	return (
		<div>
			<Layout
				backCallback={backCallback}
				bgImage={bgImage}
				height={height}
				heading='CREATE NEW EXERCISE'
			/>
			<div className={styles.wrapper}>
				{error && <Alert type={error} text={error} />}
				{isSuccess && <Alert text='Exercise created' />}
				<form onSubmit={handleSubmit}>
					<Search
						placeholder='name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Search
						placeholder='name'
						value={times}
						onChange={e => setTimes(e.target.value)}
					/>
					<div className={styles.images}>
						{data.map(name => (
							<img
								key={`name_${name}`}
								src={`/uploads/${name}.svg`}
								alt={name}
								className={cn({ [styles.active]: imageId === name })}
								onClick={() => setImageId(name)}
							/>
						))}
					</div>

					<Button text='Create' style='purple' />
				</form>
			</div>
		</div>
	)
}

export default NewExercise
