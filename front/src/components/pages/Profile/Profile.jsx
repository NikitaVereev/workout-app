import React from 'react'
import { useNavigate } from 'react-router'
import bgImage from '../../images/bg-profile.jpg'
import styles from './NewPage.module.sass'
import { useQuery } from 'react-query'
import { $api } from '../../../api/api'
import beforeImage from '../../images/cat1.jpg'
import afterImage from '../../images/cat2.jpg'
import layoutStyles from '../../common/Layout/Layout.module.sass'
import cn from 'classnames'
import Counters from '../../ui/Counters'
import Header from '../../common/Header'
import userImage from '../../images/user.svg'

const Profile = ({ backCallback, heading }) => {
	const history = useNavigate()
	backCallback = () => history('/')

	const { data, isSuccess } = useQuery(
		'profile page counters',
		() =>
			$api({
				url: '/users/profile',
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	return (
		<div>
			<div
				className={cn(layoutStyles.container, {
					[layoutStyles.otherPage]: !!heading,
				})}
				style={{ backgroundImage: `url(${bgImage})`, height: 350 }}
			>
				<Header backCallback={backCallback} />
				<div className={styles.head}>
					<img src={userImage} height={80} width={80} />
					{isSuccess && <h1>{data.email}</h1>}
				</div>
				{isSuccess && (
					<Counters
						minutes={data.minutes}
						workouts={data.workouts}
						kgs={data.kgs}
					/>
				)}
			</div>
			<div className={styles.wrapper}>
				<div className={styles.imageWrapper}>
					<div>
						<h4>Before</h4>
						<div>
							<img src={beforeImage} alt='cat' />
						</div>
					</div>
					<div>
						<h4>After</h4>
						<div>
							<img src={afterImage} alt='cat' />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
