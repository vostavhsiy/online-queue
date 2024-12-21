import { combineReducers, configureStore } from '@reduxjs/toolkit'
import mainReducer from './reducers/main'

const rootReducer = combineReducers({
	main: mainReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['main/setCalendarApi'],
				ignoredPaths: ['main.calendar', 'main.calendarWrapper'],
			},
		}),
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
