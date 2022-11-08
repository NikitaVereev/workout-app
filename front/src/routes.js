import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import NewExercise from './components/pages/NewExercise/NewExercise'
import Profile from './components/pages/Profile/Profile'
import SingleWorkout from './components/pages/Workout/SingleWorkout'
import ListWorkouts from './components/pages/Workout/ListWorkouts'

export const routes = [
	{
		path: '/',
		exact: true,
		component: Home,
		auth: false,
	},
	{
		path: '/auth',
		exact: false,
		component: Auth,
		auth: false,
	},
	{
		path: '/newpage',
		exact: false,
		component: NewWorkout,
		auth: true,
	},
	{
		path: '/new-exercise',
		exact: false,
		component: NewExercise,
		auth: true,
	},
	{
		path: '/profile',
		exact: false,
		component: Profile,
		auth: true,
	},
	{
		path: '/workouts/:id',
		exact: false,
		component: SingleWorkout,
		auth: true,
	},
	{
		path: '/workouts',
		exact: false,
		component: ListWorkouts,
		auth: true,
	},
]
