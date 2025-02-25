import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView } from 'react-native';

import { RootState } from '@/store/store';
import useEvents from '@/hooks/useEvents';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventListComponent from '@/components/calendar/EventListComponent';

export default function HomePage() {
	const { markedDates } = useSelector((state: RootState) => state.calendar);
	const { selectedDateEvents, onDayPress } = useEvents();

	const handleCreateEvent = () => {};

	return (
		<SafeAreaView style={{ flex: 1, width: '100%' }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<CalendarComponent onDayPress={onDayPress} markedDates={markedDates} />
				<EventListComponent
					selectedDateEvents={selectedDateEvents}
					onCreateEvent={handleCreateEvent}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}
