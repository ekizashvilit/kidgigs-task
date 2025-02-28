// useEvents.ts
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	setSelectedDate,
	updateMarkedDatesWithEvents,
} from '@/store/slices/calendarSlice';
import { Day } from '@/types/events';
import { RootState } from '@/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setEvents, setSelectedDateEvents } from '@/store/slices/eventsSlice';

/**
 * Manages calendar event functionality:
 * - Loads events from storage on mount
 * - Updates UI when selected date changes
 * - Handles day selection in calendar
 * - Keeps marked dates synchronized with events
 */

const useEvents = () => {
	const dispatch = useDispatch();
	const { selectedDate } = useSelector((state: RootState) => state.calendar);
	const { events, selectedDateEvents } = useSelector(
		(state: RootState) => state.events
	);

	useEffect(() => {
		const loadEvents = async () => {
			try {
				const storedEvents = await AsyncStorage.getItem('events');
				if (storedEvents) {
					const parsedEvents = JSON.parse(storedEvents);
					dispatch(setEvents(parsedEvents));
				}
			} catch (error) {
				console.error('Error loading events:', error);
			}
		};
		loadEvents();
	}, [dispatch]);

	useEffect(() => {
		if (selectedDate && events[selectedDate]) {
			dispatch(setSelectedDateEvents(events[selectedDate]));
		} else {
			dispatch(setSelectedDateEvents([]));
		}
	}, [selectedDate, events, dispatch]);

	const onDayPress = useCallback(
		(day: Day) => {
			dispatch(setSelectedDate(day.dateString));
			dispatch(updateMarkedDatesWithEvents(events));
		},
		[dispatch, events]
	);

	useEffect(() => {
		dispatch(updateMarkedDatesWithEvents(events));
	}, [selectedDate, events, dispatch]);

	return { events, selectedDateEvents, onDayPress };
};

export default useEvents;
