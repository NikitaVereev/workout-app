import React from 'react'
import Home from './components/pages/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Auth from './components/pages/Auth/Auth'
import { AuthContext } from './context/AuthContext'

function App() {
	const [isAuth, setIsAuth] = React.useState(false)

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} exact={true} />
					<Route path='/newpage' element={<NewWorkout />} />
					<Route path='/auth' element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</AuthContext.Provider>
	)
}

export default App
