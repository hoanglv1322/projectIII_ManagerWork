import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/authContext'

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url('https://tino.org/wp-content/uploads/2021/09/word-image-10.jpeg')
			center;
	background-size: cover;
	background-repeat: no-repeat;
	font-family: Helvetica;
`
const Wrapper = styled.form`
	width: 25%;
	height: fit-content;
	padding: 32px;
	border: 1px solid teal;
	background-color: rgba(255, 255, 255, 0.7);
	.text-error {
		color: red;
	}
`
const Title = styled.h1`
	color: teal;
	font-weight: 500;
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const LinkRegister = styled.div`
	margin-top: 10px;
	span {
		font-size: 15px;
		font-weight: 300;
		color: #12a29b;
	}
	.btn-link-register {
		font-size: 15px;
		font-weight: 300;
		color: #12a29b;
		text-decoration: none;
		cursor: pointer;
		margin-left: 10px;
		:hover {
			color: #0ce9de;
		}
	}
`
const Input = styled.input`
	width: 100%;
	padding: 10px;
	margin-top: 16px;
	outline: none;
	border-radius: 5px;
	border: none;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
	:focus {
		border: 1px solid #5388e9;
	}
`
const Button = styled.button`
	border-radius: 5px;
	width: 30%;
	border: none;
	outline: none;
	margin-top: 16px;
	padding: 5px;
	margin-left: 35%;
	color: white;
	font-weight: 500;
	background-color: #71d314;
	:hover {
		background-color: #75dd14;
	}
`
const Login = () => {
	const { loginUser } = useContext(AuthContext)
	const navigation = useNavigate()
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	})
	const [error, setError] = useState('')

	const onchangeForm = (e) => {
		setError('')
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
	}

	const login = async (e) => {
		e.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			if (loginData.success) {
				navigation('/boardpage')
			} else {
				setError(loginData.message)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<Wrapper onSubmit={login}>
				<Title>LOGIN</Title>
				<span className="text-error">{error}</span>
				<InputContainer>
					<Input
						placeholder="email..."
						type="email"
						name="email"
						value={loginForm.email}
						onChange={onchangeForm}
						required
					/>
					<Input
						placeholder="password..."
						type="password"
						name="password"
						value={loginForm.password}
						onChange={onchangeForm}
						required
					/>
				</InputContainer>
				<LinkRegister>
					<span>Do you have not a account?</span>
					<Link to="/register" className="btn-link-register">
						Register
					</Link>
				</LinkRegister>
				<Button type="submit">LOGIN</Button>
			</Wrapper>
		</Container>
	)
}

export default Login
