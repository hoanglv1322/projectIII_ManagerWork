import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import { setAuthToken } from '../utils/setAuthToken'
import { authReducer } from '../reducers/authReducer'
import {
	SET_AUTH,
	LOGOUT,
	CREATE_USER,
	UPDATE_USER,
	ALL_USER,
} from '../reducers/type'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		isAuthenticated: false,
		user: null,
		allUsers: [],
	})

	//Authenticate user
	const loadUSer = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const res = await axios.get(`${apiUrl}/auth`)
			if (res.data.success) {
				dispatch({
					type: SET_AUTH,
					payload: { isAuthenticated: true, user: res.data.user },
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: SET_AUTH,
				payload: { isAuthenticated: false, user: null },
			})
		}
	}
	//get all users
	const getAllUsers = async () => {
		try {
			const res = await axios.get(`${apiUrl}/user/getall`)
			if (res.data.success) {
				dispatch({
					type: ALL_USER,
					payload: { allAccounts: res.data.allUsers },
				})
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		loadUSer()
		getAllUsers()
	}, [])

	//verify email
	const verifyEmail = async (userId) => {
		try {
			const res = await axios.post(`${apiUrl}/auth/verifyuser/${userId}`)
			if (res.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
				dispatch({
					type: UPDATE_USER,
					payload: {
						isAuthenticated: true,
						user: res.data.updatedUser,
					},
				})
				loadUSer()
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//login
	const loginUser = async (userForm) => {
		try {
			const res = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (res.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
				loadUSer()
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//logoutUser
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		setAuthToken(null)
		dispatch({
			type: LOGOUT,
			payload: { isAuthenticated: false, user: null },
		})
		return { success: true, message: 'logout sucess' }
	}

	//register user
	const registerUser = async (registerForm) => {
		try {
			const res = await axios.post(
				`${apiUrl}/auth/register`,
				registerForm
			)
			if (res.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
				dispatch({
					type: CREATE_USER,
					payload: { user: res.data.user },
				})
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//update table user
	const updateTableUser = async (updateData) => {
		const { tableId, isFavourite, isRecently } = updateData
		try {
			const res = await axios.post(
				`${apiUrl}/user/updateTable/${tableId}/${isFavourite}/${isRecently}`
			)
			if (res.data.success) {
				dispatch({
					type: UPDATE_USER,
					payload: { user: res.data.user },
				})
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//update user
	const updateUser = async (userData) => {
		try {
			const res = await axios.post(`${apiUrl}/user/update`, userData)
			if (res.data.success) {
				dispatch({
					type: UPDATE_USER,
					payload: { user: res.data.user },
				})
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//context data
	const authContextData = {
		loginUser,
		authState,
		logoutUser,
		registerUser,
		verifyEmail,
		updateTableUser,
		updateUser,
		getAllUsers,
	}

	// return
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
