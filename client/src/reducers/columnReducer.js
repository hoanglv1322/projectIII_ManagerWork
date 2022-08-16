import { ADD_COLUMN, UPDATE_COLUMN, REMOVE_COLUMN, ALL_COLUMNS } from './type'

export const columnReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_COLUMNS:
			return {
				...state,
				allColumns: payload,
			}
		case ADD_COLUMN:
			return {
				...state,
				allColumns: [...state.allColumns, payload],
			}
		case REMOVE_COLUMN:
			return {
				...state,
				allColumns: state.allColumns.filter(
					(column) => column._id !== payload
				),
			}
		case UPDATE_COLUMN:
			return {
				...state,
				allColumns: state.allColumns.map((column) => {
					if (column._id === payload._id) {
						return (column = payload)
					} else {
						return column
					}
				}),
			}
		default:
			return state
	}
}
