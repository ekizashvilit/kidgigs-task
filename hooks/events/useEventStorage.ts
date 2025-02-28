import AsyncStorage from '@react-native-async-storage/async-storage';

import { EventsState } from '@/types/events';

export const useEventStorage = () => {
	const saveEventsToStorage = async (events: EventsState['events']) => {
		try {
			await AsyncStorage.setItem('events', JSON.stringify(events));
			return true;
		} catch (error) {
			console.error('Error saving events to AsyncStorage:', error);
			return false;
		}
	};

	return {
		saveEventsToStorage,
	};
};
