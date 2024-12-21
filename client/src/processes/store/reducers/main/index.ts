import { CalendarApi } from '@fullcalendar/core/index.js'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
	calendar?: CalendarApi
}

const initialState: InitialState = {
	calendar: undefined,
}

const mainReducer = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setCalendarApi: (state, action) => {
			state.calendar = action.payload.api
		},
	},
})

export default mainReducer.reducer

export const { setCalendarApi } = mainReducer.actions
export * from './selectors'
