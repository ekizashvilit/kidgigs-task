import { CalendarUtils } from 'react-native-calendars';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CalendarState } from '../../types/calendar';

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
			state.markedDates = {
				[getToday()]: {
					selected: true,
					selectedColor: '#EBF0F5',
					selectedTextColor: '#736A8F',
				},
				[action.payload]: {
					selected: true,
					selectedColor: '#FFB404',
					selectedTextColor: 'white',
				},
			};
		},
		clearSelectedDate: (state) => {
			state.selectedDate = null;
			state.markedDates = {
				[getToday()]: {
					selected: true,
					selectedColor: '#EBF0F5',
					selectedTextColor: '#736A8F',
				},
			};
		},
	},
});

export const { setSelectedDate, clearSelectedDate } = calendarSlice.actions;
export default calendarSlice.reducer;
