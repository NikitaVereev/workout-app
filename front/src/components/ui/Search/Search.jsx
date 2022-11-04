import React from 'react'
import styles from './Search.module.sass'

const Search = ({ value, placeholder, type = 'text', onChange }) => {
	return (
		<input
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			type={type}
			className={styles.input}
		/>
	)
}

export default Search
