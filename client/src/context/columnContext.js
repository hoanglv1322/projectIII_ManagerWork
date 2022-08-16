import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import {
	ADD_COLUMN,
	UPDATE_COLUMN,
	REMOVE_COLUMN,
	ALL_COLUMNS,
} from '../reducers/type'
import { columnReducer } from '../reducers/columnReducer'

export const ColumnContext = createContext()

const ColumnContextProvider = ({ children }) => {
	const [columnState, dispatch] = useReducer(columnReducer, {
		allColumns: [],
	})

	//get all tables
	const getAllColumns = async () => {
		try {
			const res = await axios.get(`${apiUrl}/column/`)
			if (res.data.success) {
				dispatch({ type: ALL_COLUMNS, payload: res.data.columns })
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllColumns()
	}, [])

	//create table
	const createColumn = async (columnData) => {
		const { tableId } = columnData
		try {
			const res = await axios.post(
				`${apiUrl}/column/create/${tableId}`,
				columnData
			)
			if (res.data.success) {
				dispatch({ type: ADD_COLUMN, payload: res.data.column })
			}
			getAllColumns()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update column drop
	const updateDropCard = async (columnData) => {
		const { id } = columnData
		try {
			const res = await axios.post(
				`${apiUrl}/column/update/drop/${id}`,
				columnData
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_COLUMN, payload: res.data.column })
			}
			getAllColumns()
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update table
	const updateColumn = async (columnData) => {
		const { id } = columnData
		try {
			const res = await axios.post(
				`${apiUrl}/column/update/${id}`,
				columnData
			)
			if (res.data.success) {
				dispatch({ type: UPDATE_COLUMN, payload: res.data.column })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete column
	const deleteColumn = async (columnId) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/column/delete/${columnId}`
			)
			if (res.data.success) {
				dispatch({ type: REMOVE_COLUMN, payload: res.data.column })
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const columnContextData = {
		columnState,
		createColumn,
		updateColumn,
		deleteColumn,
		updateDropCard,
		getAllColumns,
	}

	//return
	return (
		<ColumnContext.Provider value={columnContextData}>
			{children}
		</ColumnContext.Provider>
	)
}

export default ColumnContextProvider
