import React from 'react'
import Header from '../Header'
import styles from './Layout.module.sass'

const Layout = ({ children, bgImage }) => {
	return (
		<div
			className={styles.container}
			style={{ backgroundImage: `url(${bgImage})` }}
		>
			<Header />
			<div className={styles.contetn}>{children}</div>
		</div>
	)
}

export default Layout
