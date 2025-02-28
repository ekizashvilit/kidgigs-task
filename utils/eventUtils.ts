import AsyncStorage from '@react-native-async-storage/async-storage';

import { Event } from '@/types/events';

/**
 * Time handling:
 * - Formats time values to HH:mm:ss
 * - Converts between Date objects and time strings
 *
 * Event validation:
 * - Checks for time conflicts between events
 * - Validates event time ranges
 *
 * Storage operations:
 * - Saves/removes events to/from AsyncStorage
 * - Maintains events data structure by date
 */

export const formatTimeValue = (timeValue: Date | null | string): string => {
	if (!timeValue) return '00:00:00';

	if (typeof timeValue === 'string' && timeValue.includes(':'))
		return timeValue;

	const date = typeof timeValue === 'string' ? new Date(timeValue) : timeValue;

	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${hours}:${minutes}:${seconds}`;
};

export const checkForOverlap = (
	events: Record<string, Event[]>,
	eventDate: string,
	startTime: string,
	endTime: string,
	eventId?: string
): boolean => {
	if (!events[eventDate] || events[eventDate].length === 0) {
		return false;
	}

	const getMinutes = (timeString: string) => {
		const [hours, minutes] = timeString.split(':').map(Number);
		return hours * 60 + minutes;
	};

	const newStartMinutes = getMinutes(startTime);
	const newEndMinutes = getMinutes(endTime);

	return events[eventDate].some((existingEvent) => {
		if (eventId && existingEvent.id === eventId) {
			return false;
		}

		const existingStartMinutes = getMinutes(existingEvent.startTime);
		const existingEndMinutes = getMinutes(existingEvent.endTime);

		return (
			(newStartMinutes >= existingStartMinutes &&
				newStartMinutes < existingEndMinutes) ||
			(newEndMinutes > existingStartMinutes &&
				newEndMinutes <= existingEndMinutes) ||
			(newStartMinutes <= existingStartMinutes &&
				newEndMinutes >= existingEndMinutes)
		);
	});
};

export const saveEventToStorage = async (
	events: Record<string, Event[]>,
	date: string,
	event: Event
): Promise<Record<string, Event[]>> => {
	const updatedEvents = {
		...events,
		[date]: [...(events[date] || []), event],
	};

	await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
	return updatedEvents;
};

export const removeEventFromStorage = async (
	events: Record<string, Event[]>,
	date: string,
	eventId: string
): Promise<Record<string, Event[]>> => {
	const updatedEvents = { ...events };

	updatedEvents[date] = updatedEvents[date].filter(
		(event) => event.id !== eventId
	);

	if (updatedEvents[date].length === 0) {
		delete updatedEvents[date];
	}

	await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
	return updatedEvents;
};
