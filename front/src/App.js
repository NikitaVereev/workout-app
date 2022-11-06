import React from 'react'
import Home from './components/pages/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Auth from './components/pages/Auth/Auth'
import { AuthContext } from './context/AuthContext'
import { routes } from './routes'
import Error404 from './components/pages/404'
import { useAuth } from './hooks/useAuth'

function App() {
	const { isAuth } = useAuth()

	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					if (route.auth && !isAuth) {
						return false
					}
					return (
						<Route
							path={route.path}
							element={<route.component />}
							exact={route.exact}
							key={`route ${route.path}`}
						/>
					)
				})}
				<Route component={Error404} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
