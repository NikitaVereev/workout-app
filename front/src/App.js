import Home from './components/pages/Home'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} exact={true} />
				<Route path='/newpage' element={<NewWorkout />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
