import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Header.module.sass'
import userImage from '../../images/user.svg'
import userBack from '../../images/arrow.svg'
import menuImage from '../../images/menu.svg'
import menuCloseImage from '../../images/hamburger-close.svg'
import { Link } from 'react-router-dom'

const Header = ({ backCallback }) => {
	const hamburgerArr = [
		{ name: 'Workouts', link: 'workout' },
		{ name: 'Create new', link: 'newpage' },
		{ name: 'Profile', link: 'profile' },
		{ name: 'Logout', link: 'logout' },
	]
	const [hamburger, setHamburger] = React.useState(0)

	const [open, setOpen] = React.useState(false)

	const location = useLocation()

	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button onClick={backCallback}>
					<img src={userBack} />
				</button>
			) : (
				<button onClick={backCallback}>
					<img src={userImage} />
				</button>
			)}
			<button
				onClick={() => {
					setOpen(!open)
				}}
			>
				<img src={!open ? menuImage : menuCloseImage} />
			</button>
			{open && (
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
				</ul>
			)}
		</header>
	)
}

export default Header
