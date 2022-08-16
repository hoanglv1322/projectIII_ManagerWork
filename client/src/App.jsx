import Register from './pages/Register'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './pages/Login'
import BoardPage from './pages/BoardPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { React, useContext } from 'react'
import { AuthContext } from './context/authContext'
import ConfirmEmail from './pages/ConfirmEmail'
import BoardColumnPage from './pages/BoardColumnPage'

const Container = styled.div`
	font-family: Roboto, sans-serif;
	margin: 0;
	padding: 0;
`

const App = () => {
	const {
		authState: { isAuthenticated },
	} = useContext(AuthContext)
	return (
		<Container>
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route
						path="/"
						element={isAuthenticated ? <BoardPage /> : <Login />}
					/>
					<Route
						path="/boardpage"
						element={isAuthenticated ? <BoardPage /> : <Login />}
					/>
					<Route
						path="/table/:tableId"
						element={
							isAuthenticated ? <BoardColumnPage /> : <Login />
						}
					/>
					<Route path="/auth/verifyuser" element={<ConfirmEmail />} />
				</Routes>
			</BrowserRouter>
		</Container>
	)
}

export default App
