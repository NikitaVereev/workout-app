import React from 'react'

import { useNavigate } from 'react-router'
import Layout from '../../common/Layout'
import bgImage from '../../images/auth.jpg'
import styles from './Auth.module.sass'
import Search from '../../ui/Search/Search'
import Button from '../../ui/Button/Button'
import { Link } from 'react-router-dom'
import Alert from '../../ui/Alert/Alert'
import { useMutation } from 'react-query'
import { $api } from '../../../api/api'
import { useAuth } from '../../../hooks/useAuth'

const Auth = ({ height, backCallback }) => {
	const { setIsAuth } = useAuth()
	const history = useNavigate()
	backCallback = () => history('/')
	const [email, setEmail] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [isType, setIsType] = React.useState('auth') //auth, reg

	const successLogin = token => {
		localStorage.setItem('token', token)
		setIsAuth(true)

		setPassword('')
		setEmail('')

		history('/')
	}

	const { mutate: register, error } = useMutation(
		'Registration',
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				successLogin(data.token)
			},
		}
	)
	const { mutate: auth, error: errorAuth } = useMutation(
		'Auth',
		() =>
			$api({
				url: '/users/login',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				successLogin(data.token)
			},
		}
	)

	/*React context auth + LocalStorage */

	const handleSubmit = e => {
		e.preventDefault()
		if (isType === 'auth') {
			console.log('auth')
			auth()
		} else {
			register()
		}
	}
	return (
		<>
			<Layout
				backCallback={backCallback}
				bgImage={bgImage}
				height={height}
				heading='AUTHORIZATION & REGISTRATION'
			/>
			<div className={styles.wrapper}>
				{error && <Alert type='error' text={error} />}
				{errorAuth && <Alert type='error' text={errorAuth} />}
				<form onSubmit={handleSubmit}>
					<Search
						placeholder='Enter your e-mail'
						value={email}
						type='email'
						onChange={e => setEmail(e.target.value)}
						required
					/>
					<Search
						placeholder='Enter your password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
						type='password'
					/>
					<Link to='/' className={styles.exercise}>
						Forgot your password
					</Link>
					<div className={styles.buttonWrapper}>
						<Button
							text='Sign in'
							style='purple'
							callback={() => setIsType('auth')}
							type='submit'
						/>
						<Button
							text='Sign up'
							style='purple'
							callback={() => setIsType('reg')}
						/>
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
