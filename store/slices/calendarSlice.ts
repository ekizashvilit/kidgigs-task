import { CalendarUtils } from 'react-native-calendars';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CalendarMarking, CalendarState } from '../../types/calendar';

/**
 * Redux slice for calendar state management
 * Handles selected dates, marked dates for events, and visual indicators
 */

const getToday = () => {
	const date = new Date();
	return CalendarUtils.getCalendarDateString(date);
};

const initialState: CalendarState = {
	selectedDate: null,
	markedDates: {
		[getToday()]: {
			selected: true,
			selectedColor: '#EBF0F5',
			selectedTextColor: '#736A8F',
		},
	},
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload;
		},
		clearSelectedDate: (state) => {
			state.selectedDate = null;
		},
		updateMarkedDatesWithEvents: (
			state,
			action: PayloadAction<{ [key: string]: any }>
		) => {
			const eventDates = action.payload;

			const updatedMarkedDates: { [key: string]: CalendarMarking } = {};

			Object.keys(eventDates).forEach((date) => {
				updatedMarkedDates[date] = {
					...updatedMarkedDates[date],
					marked: true,
					dotColor: '#FFB404',
				};
			});

			const today = getToday();
			updatedMarkedDates[today] = {
				...updatedMarkedDates[today],
				selected: state.selectedDate !== today,
				selectedColor: '#EBF0F5',
				selectedTextColor: '#736A8F',
			};

			if (state.selectedDate) {
				updatedMarkedDates[state.selectedDate] = {
					...updatedMarkedDates[state.selectedDate],
					selected: true,
					selectedColor: '#FFB404',
					selectedTextColor: 'white',
				};
			}

			state.markedDates = updatedMarkedDates;
		},
	},
});

export const {
	setSelectedDate,
	clearSelectedDate,
	updateMarkedDatesWithEvents,
} = calendarSlice.actions;
export default calendarSlice.reducer;
