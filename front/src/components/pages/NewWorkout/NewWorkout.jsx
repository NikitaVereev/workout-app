import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import Layout from '../../common/Layout'
import bgImage from '../../images/bg-auth.jpg'

const NewWorkout = ({ height, backCallback }) => {
	const history = useNavigate()
	backCallback = () => history('/')
	return (
		<div>
			<Layout backCallback={backCallback} bgImage={bgImage} height={height} />
			dfdf
		</div>
	)
}

export default NewWorkout
