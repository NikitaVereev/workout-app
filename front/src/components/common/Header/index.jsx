import React from 'react'
import styles from './Header.module.sass'
import userImage from '../../images/user.svg'
import menuImage from '../../images/menu.svg'
import menuCloseImage from '../../images/hamburger-close.svg'

const Header = () => {
	const hamburgerArr = ['Workouts', 'Create new', 'Profile', 'Logout']
	const [hamburger, setHamburger] = React.useState(0)

	const [open, setOpen] = React.useState(false)

	return (
		<header className={styles.header}>
			<button>
				<img src={userImage} />
			</button>
			<button
				onClick={() => {
					setOpen(!open)
				}}
			>
				{open ? <img src={menuImage} /> : <img src={menuCloseImage} />}
			</button>
			{!open && (
				<ul className={styles.popup}>
					{hamburgerArr.map((e, index) => (
						<li
							key={index}
							onClick={() => setHamburger(index)}
							className={hamburger === index ? 'active' : ''}
						>
							{e}
						</li>
					))}
				</ul>
			)}
			{console.log(hamburger)}
		</header>
	)
}

export default Header
