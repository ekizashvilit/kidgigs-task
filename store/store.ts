import { configureStore } from '@reduxjs/toolkit';

import eventsReducer from './slices/eventsSlice';
import calendarReducer from './slices/calendarSlice';

export const store = configureStore({
	reducer: {
		calendar: calendarReducer,
		events: eventsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
