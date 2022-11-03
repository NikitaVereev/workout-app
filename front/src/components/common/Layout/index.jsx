import React from 'react'
import Header from '../Header'
import styles from './Layout.module.sass'

const Layout = ({
	children,
	bgImage,
	backCallback,
	heading = '',
	height = 'calc(350px - 60px',
}) => {
	return (
		<div
			className={styles.container}
			style={{ height, backgroundImage: `url(${bgImage})` }}
		>
			<Header backCallback={backCallback} />
			<div className={styles.content}>{children}</div>
		</div>
	)
}

export default Layout
