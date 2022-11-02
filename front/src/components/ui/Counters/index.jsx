import React from 'react'
import styles from './Counters.module.sass'

const Counters = () => {
	const counters = {
		minutes: 7,
		workouts: 1,
		kgs: 5,
	}

	return (
		<div className={styles.wrapper}>
			{Object.entries(counters).map(item => (
				<div key={'_key' + item[0]} className={styles.count}>
					<div className={styles.heading}>{item[0]}</div>
					<div className='number'>{item[1]}</div>
				</div>
			))}
		</div>
	)
}

export default Counters
