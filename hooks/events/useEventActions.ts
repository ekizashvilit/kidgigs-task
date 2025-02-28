import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
	saveEventToStorage,
	removeEventFromStorage,
	formatTimeValue,
	checkForOverlap,
} from '@/utils/eventUtils';
import {
	addEvent as addEventAction,
	updateEvent as updateEventAction,
	deleteEvent as deleteEventAction,
	setSelectedDateEvents,
	setAllEvents,
} from '@/store/slices/eventsSlice';
import {
	createRecurringEvents,
	deleteRecurringEvents,
	createRecurringEventsAndGetUpdated,
	isRecurringSeries,
} from '@/utils/recurringEventUtils';
import { RootState } from '@/store/store';
import { useDateUtils } from '../useDateUtils';
import { Event, EventFormData, EventFormProps } from '@/types/events';

/**
 * Manages all CRUD operations for calendar events including:
 * - Creating new events with validation for time conflicts
 * - Updating existing events
 * - Deleting events with special handling for recurring series
 * - Handling recurring event creation, updates and deletion
 * - Providing confirmation dialogs for destructive actions
 * - Managing state updates in both Redux and local storage
 *
 * This hook centralizes event manipulation logic to ensure consistent
 * handling of events across the application.
 */

const useEventActions = ({
	event,
	isEditMode,
	selectedDate,
	onFormClose,
}: EventFormProps) => {
	const dispatch = useDispatch();
	const { events } = useSelector((state: RootState) => state.events);
	const { isDateInPast } = useDateUtils();

	const onSubmit = useCallback(
		async (formData: EventFormData) => {
			if (!selectedDate) return;

			if (isEditMode && event) {
				await editEvent(event.id, formData);
			} else {
				await saveEvent(formData);
			}
		},
		[isEditMode, event, selectedDate, isDateInPast]
	);

	const handleDelete = useCallback(async () => {
		if (!event || !selectedDate) return;

		const baseId = event.id.includes('-') ? event.id.split('-')[0] : event.id;
		const isRecurringEvent =
			event.repeat !== 'none' || isRecurringSeries(event.id);

		if (isRecurringEvent) {
			showRecurringDeleteConfirmation(event.id, baseId);
		} else {
			showSimpleDeleteConfirmation(event.id);
		}
	}, [event, selectedDate, isDateInPast]);

	const showRecurringDeleteConfirmation = useCallback(
		(eventId: string, baseId: string) => {
			Alert.alert(
				'Delete Recurring Event',
				'Do you want to delete just this event or all future events in this series?',
				[
					{ text: 'Cancel', style: 'cancel' },
					{
						text: 'Only This Event',
						onPress: async () => {
							await removeEvent(eventId);
							if (onFormClose) onFormClose();
						},
					},
					{
						text: 'All Future Events',
						style: 'destructive',
						onPress: async () => {
							await deleteRecurringEventsHandler(baseId);
							if (onFormClose) onFormClose();
						},
					},
				]
			);
		},
		[onFormClose]
	);

	const showSimpleDeleteConfirmation = useCallback(
		(eventId: string) => {
			Alert.alert(
				'Delete Event',
				'Are you sure you want to delete this event?',
				[
					{ text: 'Cancel', style: 'cancel' },
					{
						text: 'Delete',
						style: 'destructive',
						onPress: async () => {
							await removeEvent(eventId);
							if (onFormClose) onFormClose();
						},
					},
				]
			);
		},
		[onFormClose]
	);

	const deleteRecurringEventsHandler = async (baseId: string) => {
		if (!selectedDate) return;

		const updatedEvents = await deleteRecurringEvents(
			events,
			baseId,
			selectedDate
		);

		if (updatedEvents) {
			dispatch(setAllEvents(updatedEvents));

			if (updatedEvents[selectedDate]) {
				dispatch(setSelectedDateEvents(updatedEvents[selectedDate]));
			} else {
				dispatch(setSelectedDateEvents([]));
			}
		}
	};

	const saveEvent = useCallback(
		async (formData: EventFormData) => {
			if (!selectedDate) return;

			const startTime = formatTimeValue(formData.startTime);
			const endTime = formatTimeValue(formData.endTime);

			if (checkForOverlap(events, selectedDate, startTime, endTime)) {
				Alert.alert(
					'Time Conflict',
					'This event overlaps with an existing event. Please choose a different time slot.'
				);
				return;
			}

			const newEvent: Event = {
				id: Date.now().toString(),
				eventName: formData.eventName,
				startDate: formData.startDate
					? new Date(formData.startDate).toISOString().split('T')[0]
					: selectedDate,
				startTime,
				endDate: formData.endDate
					? new Date(formData.endDate).toISOString().split('T')[0]
					: selectedDate,
				endTime,
				repeat: formData.repeat || 'none',
			};

			dispatch(addEventAction({ date: selectedDate, event: newEvent }));

			const updatedEvents = await saveEventToStorage(
				events,
				selectedDate,
				newEvent
			);
			dispatch(setSelectedDateEvents(updatedEvents[selectedDate] || []));

			if (newEvent.repeat !== 'none') {
				await createRecurringEvents(
					dispatch,
					events,
					newEvent,
					selectedDate,
					newEvent.repeat
				);
			}

			if (onFormClose) onFormClose();
		},
		[dispatch, events, onFormClose, selectedDate]
	);

	const editEvent = useCallback(
		async (eventId: string, formData: EventFormData) => {
			if (!selectedDate) return;

			const startTime = formatTimeValue(formData.startTime);
			const endTime = formatTimeValue(formData.endTime);

			if (checkForOverlap(events, selectedDate, startTime, endTime, eventId)) {
				Alert.alert(
					'Time Conflict',
					'This event overlaps with an existing event. Please choose a different time slot.'
				);
				return;
			}

			const originalEvent = events[selectedDate]?.find((e) => e.id === eventId);
			if (!originalEvent) {
				Alert.alert('Error', 'Event not found');
				return;
			}

			const updatedEvent: Event = {
				id: eventId,
				eventName: formData.eventName,
				startDate: formData.startDate
					? new Date(formData.startDate).toISOString().split('T')[0]
					: selectedDate,
				startTime,
				endDate: formData.endDate
					? new Date(formData.endDate).toISOString().split('T')[0]
					: selectedDate,
				endTime,
				repeat: formData.repeat || 'none',
			};

			try {
				dispatch(
					updateEventAction({ date: selectedDate, eventId, updatedEvent })
				);

				let updatedEvents = JSON.parse(JSON.stringify(events));
				updatedEvents[selectedDate] = updatedEvents[selectedDate].map((event) =>
					event.id === eventId ? updatedEvent : event
				);

				const isRepeatChanged = originalEvent.repeat !== updatedEvent.repeat;
				const isDetailsChanged =
					originalEvent.eventName !== updatedEvent.eventName ||
					originalEvent.startTime !== updatedEvent.startTime ||
					originalEvent.endTime !== updatedEvent.endTime;

				if (
					isRepeatChanged ||
					(updatedEvent.repeat !== 'none' && isDetailsChanged)
				) {
					const baseId = isRecurringSeries(eventId)
						? eventId.split('-')[0]
						: eventId;

					if (isRecurringSeries(eventId)) {
						updatedEvent.id = baseId;
					}

					updatedEvents = await createRecurringEventsAndGetUpdated(
						dispatch,
						updatedEvent,
						selectedDate,
						updatedEvent.repeat,
						updatedEvents
					);
				}

				dispatch(setAllEvents(updatedEvents));
				dispatch(setSelectedDateEvents(updatedEvents[selectedDate] || []));

				if (onFormClose) onFormClose();
			} catch (error) {
				console.error('Error updating event:', error);
				Alert.alert('Error', 'Failed to update event');
			}
		},
		[dispatch, events, onFormClose, selectedDate]
	);

	const removeEvent = useCallback(
		async (eventId: string) => {
			if (!selectedDate) return;

			dispatch(deleteEventAction({ date: selectedDate, eventId }));
			const updatedEvents = await removeEventFromStorage(
				events,
				selectedDate,
				eventId
			);

			if (updatedEvents[selectedDate]?.length) {
				dispatch(setSelectedDateEvents(updatedEvents[selectedDate]));
			} else {
				dispatch(setSelectedDateEvents([]));
			}
		},
		[dispatch, events, selectedDate]
	);

	return {
		onSubmit,
		handleDelete,
	};
};

export default useEventActions;
