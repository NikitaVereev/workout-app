import React from 'react'
import styles from './Button.module.sass'

const Button = ({ callback, text, style }) => {
	return (
		<button
			type='submit'
			onClick={callback}
			className={`${styles.button} ${styles[style]}`}
		>
			{text}
		</button>
	)
}

export default Button
