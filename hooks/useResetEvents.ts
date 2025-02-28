import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	setAllEvents,
	setSelectedDateEvents,
} from '@/store/slices/eventsSlice';
import { updateMarkedDatesWithEvents } from '@/store/slices/calendarSlice';

export default function useResetEvents() {
	const dispatch = useDispatch();

	const resetAllEvents = useCallback(() => {
		Alert.alert(
			'Reset All Events',
			'Are you sure you want to delete all events? This action cannot be undone.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Delete All',
					style: 'destructive',
					onPress: async () => {
						try {
							await AsyncStorage.removeItem('events');

							dispatch(setAllEvents({}));
							dispatch(setSelectedDateEvents([]));
							dispatch(updateMarkedDatesWithEvents({}));

							Alert.alert('Success', 'All events have been deleted.');
						} catch (error) {
							Alert.alert('Error', 'Failed to reset events. Please try again.');
							console.error('Failed to reset events:', error);
						}
					},
				},
			]
		);
	}, [dispatch]);

	return { resetAllEvents };
}
