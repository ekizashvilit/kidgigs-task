import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Day } from '@/types/events';
import { setSelectedDate } from '@/store/slices/calendarSlice';

const useEvents = () => {
	const dispatch = useDispatch();
	const [events, setEvents] = useState<{ [key: string]: Event[] }>({});
	const [selectedDateEvents, setSelectedDateEvents] = useState<Event[]>([]);

	useEffect(() => {
		const loadEvents = async () => {
			const storedEvents = await AsyncStorage.getItem('events');
			if (storedEvents) {
				setEvents(JSON.parse(storedEvents));
			}
		};
		loadEvents();
	}, []);

	const onDayPress = useCallback(
		async (day: Day) => {
			dispatch(setSelectedDate(day.dateString));
			const dateEvents: Event[] = events[day.dateString] || [];
			const eventsWithDate: Event[] = dateEvents.map((event) => ({
				...event,
				startDate: day.dateString,
				endDate: day.dateString,
			}));
			setSelectedDateEvents(eventsWithDate);
		},
		[dispatch, events]
	);

	return { events, selectedDateEvents, onDayPress };
};

export default useEvents;
