import React from 'react'
import ReactSelect from 'react-select'
import { useNavigate } from 'react-router'
import Layout from '../../common/Layout'
import bgImage from '../../images/bg-auth.jpg'
import styles from './NewPage.module.sass'
import Search from '../../ui/Search/Search'
import Button from '../../ui/Button/Button'
import { Link } from 'react-router-dom'

const NewWorkout = ({ height, backCallback }) => {
	const history = useNavigate()
	backCallback = () => history('/')
	const [isValue, setIsValue] = React.useState('')
	const [isExercises, setIsExercises] = React.useState([])
	return (
		<div>
			<Layout
				backCallback={backCallback}
				bgImage={bgImage}
				height={height}
				heading='CREATE NEW WORKOUT'
			/>
			<div className={styles.wrapper}>
				<form>
					<Search
						placeholder='name'
						value={isValue}
						onChange={e => setIsValue(e.target.value)}
					/>
					<Link to='/' className={styles.exercise}>
						Add new exercise
					</Link>
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Exercises'
						title='Exercises'
						options={[
							{ value: 'pjqvcq', label: 'Push-ups' },
							{ value: 'odvonwdvn', label: 'Pull-ups' },
						]}
						value={isExercises}
						onChange={setIsExercises}
						isMulti={true}
					/>
					<Button text='Create' style='purple' />
				</form>
			</div>
		</div>
	)
}

export default NewWorkout
