import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Event } from '@/types/events';

interface EventsState {
	events: { [key: string]: Event[] };
	selectedDateEvents: Event[];
}

const initialState: EventsState = {
	events: {},
	selectedDateEvents: [],
};

const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEvents: (state, action: PayloadAction<{ [key: string]: Event[] }>) => {
			state.events = action.payload;
		},
		setSelectedDateEvents: (state, action: PayloadAction<Event[]>) => {
			state.selectedDateEvents = action.payload;
		},
		addEvent: (
			state,
			action: PayloadAction<{ date: string; event: Event }>
		) => {
			const { date, event } = action.payload;
			if (!state.events[date]) {
				state.events[date] = [];
			}
			state.events[date].push(event);
		},
		updateEvent: (
			state,
			action: PayloadAction<{
				date: string;
				eventId: string;
				updatedEvent: Event;
			}>
		) => {
			const { date, eventId, updatedEvent } = action.payload;
			const eventIndex = state.events[date].findIndex((e) => e.id === eventId);
			if (eventIndex !== -1) {
				state.events[date][eventIndex] = updatedEvent;
			}
		},
		deleteEvent: (state, action) => {
			const { date, eventId } = action.payload;

			if (state.events[date]) {
				state.events[date] = state.events[date].filter(
					(event) => event.id !== eventId
				);

				if (state.events[date].length === 0) {
					delete state.events[date];
				}
			}
		},
		setAllEvents: (
			state,
			action: PayloadAction<{ [key: string]: Event[] }>
		) => {
			state.events = action.payload;
		},
	},
});

export const {
	setEvents,
	setSelectedDateEvents,
	addEvent,
	updateEvent,
	deleteEvent,
	setAllEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
