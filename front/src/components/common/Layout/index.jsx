import React from 'react'
import Header from '../Header'
import styles from './Layout.module.sass'
import cn from 'classnames'

const Layout = ({ children, bgImage, backCallback, heading = '' }) => {
	return (
		<div
			className={cn(styles.container, {
				[styles.otherPage]: !!heading,
			})}
			style={{ backgroundImage: `url(${bgImage})` }}
			heading={heading}
		>
			<Header backCallback={backCallback} />
			{heading && <h1>{heading}</h1>}
			{children && <div className={styles.content}>{children}</div>}
		</div>
	)
}

export default Layout
