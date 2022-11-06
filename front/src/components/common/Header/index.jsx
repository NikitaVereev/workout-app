import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Header.module.sass'
import userImage from '../../images/user.svg'
import userBack from '../../images/arrow.svg'
import menuImage from '../../images/menu.svg'
import menuCloseImage from '../../images/hamburger-close.svg'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useOutsideAlerter } from '../../../hooks/useOutsideAlerter'
import authImage from '../../images/dumbbell.svg'

const Header = ({ backCallback }) => {
	const { ref, isComponentVisible, setIsComponentVisible } =
		useOutsideAlerter(false)
	const { isAuth } = useAuth()
	const { setIsAuth } = useAuth()

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuth(false)
		setIsComponentVisible(false)
	}

	const hamburgerArr = [
		{ name: 'Workouts', link: 'workout' },
		{ name: 'Create new', link: 'newpage' },
		{ name: 'Profile', link: 'profile' },
	]
	const [hamburger, setHamburger] = React.useState(0)

	const [open, setOpen] = React.useState(false)

	const location = useLocation()
	const authPage = useNavigate()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button onClick={backCallback}>
					<img src={userBack} />
				</button>
			) : (
				<button
					type='button'
					onClick={() => authPage(isAuth ? '/profile' : '/auth')}
				>
					<img src={isAuth ? authImage : userImage} height='24' />
				</button>
			)}
			<div ref={ref}>
				<button
					onClick={() => {
						setOpen(() => setIsComponentVisible(!isComponentVisible))
					}}
				>
					<img src={!isComponentVisible ? menuImage : menuCloseImage} />
				</button>
				{isComponentVisible && (
					<ul className={styles.popup}>
						{hamburgerArr.map((obj, index) => (
							<li key={index}>
								<Link
									onClick={() => setHamburger(index)}
									className={hamburger === index ? 'active' : ''}
									to={obj.link}
								>
									{obj.name}
								</Link>
							</li>
						))}
						<li>
							<button onClick={handleLogout}>Logout</button>
						</li>
					</ul>
				)}
			</div>
		</header>
	)
}

export default Header
