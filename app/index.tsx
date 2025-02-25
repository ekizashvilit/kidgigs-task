import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';

import { Day } from '@/types/events';
import { RootState } from '@/store/store';
import useEvents from '@/hooks/useEvents';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventListComponent from '@/components/calendar/EventListComponent';

export default function HomePage() {
	const [showEventForm, setShowEventForm] = useState(false);

	const { markedDates, selectedDate } = useSelector(
		(state: RootState) => state.calendar
	);
	const { selectedDateEvents, onDayPress } = useEvents();

	const handleCreateEvent = () => {};

	const handleDayPress = (day: Day): void => {
		if (showEventForm) {
			setShowEventForm(false);
		}
		onDayPress(day);
	};

	return (
		<SafeAreaView style={{ flex: 1, width: '100%' }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CalendarComponent
					onDayPress={handleDayPress}
					markedDates={markedDates}
				/>
				<EventListComponent
					selectedDateEvents={selectedDateEvents}
					onCreateEvent={handleCreateEvent}
					showEventForm={showEventForm}
					setShowEventForm={setShowEventForm}
					selectedDate={selectedDate}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
