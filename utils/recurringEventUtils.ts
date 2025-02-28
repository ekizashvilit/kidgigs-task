import AsyncStorage from '@react-native-async-storage/async-storage';

import { Event } from '@/types/events';

/**
 * - Creates weekly, bi-weekly and monthly recurring events
 * - Handles event series deletion and updates
 * - Maintains recurring event IDs with patterns (baseId-w1, baseId-b1, baseId-m1)
 * - Stores recurring events for up to 1 year from start date
 */

export const isRecurringSeries = (eventId: string): boolean => {
	return eventId.includes('-') && Boolean(eventId.match(/-(w|b|m)\d+$/));
};

export const deleteRecurringEvents = async (
	events: Record<string, Event[]>,
	baseId: string,
	currentDate: string
): Promise<Record<string, Event[]> | null> => {
	const currentEvents = { ...events };
	let hasChanges = false;

	Object.keys(currentEvents).forEach((date) => {
		if (date >= currentDate) {
			const eventsAfterFilter = currentEvents[date].filter((event) => {
				const isPartOfSeries =
					event.id === baseId ||
					(event.id.startsWith(baseId) &&
						event.id.match(new RegExp(`^${baseId}-(w|b|m)\\d+$`)));

				return !isPartOfSeries;
			});

			if (eventsAfterFilter.length !== currentEvents[date].length) {
				hasChanges = true;
				currentEvents[date] = eventsAfterFilter;

				if (eventsAfterFilter.length === 0) {
					delete currentEvents[date];
				}
			}
		}
	});

	if (hasChanges) {
		try {
			await AsyncStorage.setItem('events', JSON.stringify(currentEvents));
			return currentEvents;
		} catch (error) {
			console.error('Error updating AsyncStorage:', error);
			return null;
		}
	} else {
		return null;
	}
};

export const createRecurringEvents = async (
	dispatch: any,
	events: Record<string, Event[]>,
	baseEvent: Event,
	selectedDate: string,
	repeat: string
) => {
	if (repeat === 'none') return;

	const recurringEvents = [];
	const startDate = new Date(selectedDate);
	const endDate = new Date(startDate);
	endDate.setFullYear(endDate.getFullYear() + 1);

	if (repeat === 'monthly') {
		recurringEvents.push(...createMonthlyEvents(baseEvent, startDate, events));
	} else {
		recurringEvents.push(
			...createWeeklyOrBiweeklyEvents(
				baseEvent,
				startDate,
				endDate,
				repeat,
				events
			)
		);
	}

	if (recurringEvents.length > 0) {
		const updatedEvents = { ...events };

		recurringEvents.forEach(({ date, event }) => {
			if (!updatedEvents[date]) {
				updatedEvents[date] = [];
			}
			updatedEvents[date].push(event);

			dispatch({ type: 'events/addEvent', payload: { date, event } });
		});

		await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
	}
};

export const createRecurringEventsAndGetUpdated = async (
	dispatch: any,
	baseEvent: Event,
	selectedDate: string,
	repeat: string,
	currentEvents: Record<string, Event[]>
): Promise<Record<string, Event[]>> => {
	if (repeat === 'none') return currentEvents;

	const updatedEvents = JSON.parse(JSON.stringify(currentEvents));

	const nextDay = new Date(selectedDate);
	nextDay.setDate(nextDay.getDate() + 1);
	const nextDayStr = nextDay.toISOString().split('T')[0];
	const baseId = baseEvent.id;

	Object.keys(updatedEvents).forEach((date) => {
		if (date >= nextDayStr && updatedEvents[date]) {
			updatedEvents[date] = updatedEvents[date].filter((event) => {
				const isPartOfSeries =
					event.id === baseId ||
					(event.id.startsWith(baseId) &&
						event.id.match(new RegExp(`^${baseId}-(w|b|m)\\d+$`)));
				return !isPartOfSeries;
			});

			if (updatedEvents[date].length === 0) {
				delete updatedEvents[date];
			}
		}
	});

	const startDate = new Date(selectedDate);
	const endDate = new Date(startDate);
	endDate.setFullYear(endDate.getFullYear() + 1);
	const recurringEvents = [];

	if (repeat === 'monthly') {
		recurringEvents.push(
			...createMonthlyEvents(baseEvent, startDate, updatedEvents)
		);
	} else {
		recurringEvents.push(
			...createWeeklyOrBiweeklyEvents(
				baseEvent,
				startDate,
				endDate,
				repeat,
				updatedEvents
			)
		);
	}

	recurringEvents.forEach(({ date, event }) => {
		if (!updatedEvents[date]) {
			updatedEvents[date] = [];
		}
		updatedEvents[date].push(event);
	});

	await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
	return updatedEvents;
};

function createMonthlyEvents(
	baseEvent: Event,
	startDate: Date,
	events: Record<string, Event[]>
) {
	const recurringEvents = [];
	const originalDay = startDate.getDate();

	for (let i = 1; i <= 12; i++) {
		const nextDate = new Date(startDate);
		nextDate.setMonth(nextDate.getMonth() + i);

		const monthDays = new Date(
			nextDate.getFullYear(),
			nextDate.getMonth() + 1,
			0
		).getDate();

		if (originalDay > monthDays) {
			nextDate.setDate(monthDays);
		}

		const dateStr = nextDate.toISOString().split('T')[0];

		const recurringEvent = {
			...baseEvent,
			id: `${baseEvent.id}-m${i}`,
			startDate: dateStr,
			endDate: dateStr,
		};

		recurringEvents.push({ date: dateStr, event: recurringEvent });
	}

	return recurringEvents;
}

function createWeeklyOrBiweeklyEvents(
	baseEvent: Event,
	startDate: Date,
	endDate: Date,
	repeat: string,
	events: Record<string, Event[]>
) {
	const recurringEvents = [];
	let currentDate = new Date(startDate);
	let counter = 0;
	const interval = repeat === 'weekly' ? 7 : 14;

	currentDate.setDate(currentDate.getDate() + interval);

	while (currentDate <= endDate && counter < 52) {
		counter++;
		const eventDate = currentDate.toISOString().split('T')[0];

		const recurringEvent = {
			...baseEvent,
			id: `${baseEvent.id}-${repeat === 'weekly' ? 'w' : 'b'}${counter}`,
			startDate: eventDate,
			endDate: eventDate,
		};

		recurringEvents.push({ date: eventDate, event: recurringEvent });

		currentDate.setDate(currentDate.getDate() + interval);
	}

	return recurringEvents;
}
