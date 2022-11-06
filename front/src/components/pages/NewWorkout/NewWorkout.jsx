import React from 'react'
import ReactSelect from 'react-select'
import { useNavigate } from 'react-router'
import Layout from '../../common/Layout'
import bgImage from '../../images/bg-auth.jpg'
import styles from './NewPage.module.sass'
import Search from '../../ui/Search/Search'
import Button from '../../ui/Button/Button'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { $api } from '../../../api/api'
import Alert from '../../ui/Alert/Alert'

const NewWorkout = ({ height, backCallback }) => {
	const history = useNavigate()
	backCallback = () => history('/')
	const [name, setName] = React.useState('')
	const [exercisesCurrent, setExercisesCurrent] = React.useState([])

	const { data, isSuccess } = useQuery(
		'list exercises',
		() =>
			$api({
				url: '/exercises',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		error,
		isSuccess: isSuccessMutate,
	} = useMutation(
		'Create New Workout',
		({ exIdx }) =>
			$api({
				url: '/workouts',
				type: 'POST',
				body: { name, exerciseIds: exIdx },
			}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent([])
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()
		const exIdx = exercisesCurrent.map(ex => ex.value)
		mutate({
			exIdx,
		})
	}

	return (
		<div>
			<Layout
				backCallback={backCallback}
				bgImage={bgImage}
				height={height}
				heading='CREATE NEW WORKOUT'
			/>
			<div className={styles.wrapper}>
				{error && <Alert type={error} text={error} />}
				{isSuccessMutate && <Alert text={'Workout created'} />}
				<form onSubmit={handleSubmit}>
					<Search
						placeholder='name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
					<Link to='/new-exercise' className={styles.exercise}>
						Add new exercise
					</Link>
					{isSuccess && data && (
						<ReactSelect
							classNamePrefix='select2-selection'
							placeholder='Exercises'
							title='Exercises'
							options={data.map(ex => ({
								value: ex._id,
								label: ex.name,
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
							isMulti={true}
						/>
					)}
					<Button text='Create' style='purple' />
				</form>
			</div>
		</div>
	)
}

export default NewWorkout
