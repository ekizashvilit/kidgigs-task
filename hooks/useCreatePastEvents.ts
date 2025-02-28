import { Alert } from 'react-native';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Event } from '@/types/events';
import { RootState } from '@/store/store';
import { useEventStorage } from './events/useEventStorage';
import { addEvent } from '@/store/slices/eventsSlice';

export default function useCreatePastEvents() {
	const dispatch = useDispatch();
	const { events } = useSelector((state: RootState) => state.events);
	const { saveEventsToStorage } = useEventStorage();

	const startDate = useMemo(() => new Date(2025, 1, 21), []);
	const endDate = useMemo(() => new Date(2025, 1, 27), []);

	const createPastEvents = useCallback(async () => {
		try {
			let updatedEvents = { ...events };

			for (
				let d = new Date(startDate);
				d <= endDate;
				d.setDate(d.getDate() + 1)
			) {
				const dateString = d.toISOString().split('T')[0];

				const existingEvents = updatedEvents[dateString] || [];
				const existingMorningEvent = existingEvents.some(
					(event) => event.id === `past-event-morning-${dateString}`
				);
				const existingAfternoonEvent = existingEvents.some(
					(event) => event.id === `past-event-afternoon-${dateString}`
				);

				const eventsForDay: Event[] = [];

				if (!existingMorningEvent) {
					eventsForDay.push({
						id: `past-event-morning-${dateString}`,
						eventName: `Morning Test Event ${d.getDate()}`,
						startDate: dateString,
						startTime: '09:00',
						endDate: dateString,
						endTime: '10:30',
						repeat: 'none',
					});
				}

				if (!existingAfternoonEvent) {
					eventsForDay.push({
						id: `past-event-afternoon-${dateString}`,
						eventName: `Afternoon Test Event ${d.getDate()}`,
						startDate: dateString,
						startTime: '14:00',
						endDate: dateString,
						endTime: '15:30',
						repeat: 'none',
					});
				}

				if (eventsForDay.length > 0) {
					updatedEvents[dateString] = [...existingEvents, ...eventsForDay];

					eventsForDay.forEach((event) => {
						dispatch(addEvent({ date: dateString, event }));
					});
				}
			}

			await saveEventsToStorage(updatedEvents);

			Alert.alert('Success', 'Past test events created for Feb 20-26, 2025');
		} catch (error) {
			Alert.alert('Error', 'Failed to create past events. Please try again.');
			console.error('Failed to create past events:', error);
		}
	}, [dispatch, events, saveEventsToStorage, startDate, endDate]);

	return { createPastEvents };
}
