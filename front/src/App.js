import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'
import Error404 from './components/pages/404'
import { useAuth } from './hooks/useAuth'

function App() {
	const { isAuth } = useAuth()

	return (
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
	)
}

export default App
