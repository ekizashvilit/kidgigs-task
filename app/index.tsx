import { useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { Day } from '@/types/events';
import { RootState } from '@/store/store';
import useEvents from '@/hooks/events/useEvents';
import useResetEvents from '@/hooks/useResetEvents';
import homePageStyles from '@/styles/homePage.styles';
import ButtonGroup from '@/components/buttons/TestButtons';
import useCreatePastEvents from '@/hooks/useCreatePastEvents';
import CalendarComponent from '@/components/calendar/CalendarComponent';
import EventListComponent from '@/components/events/EventListComponent';

export default function HomePage(): JSX.Element {
	const [showEventForm, setShowEventForm] = useState(false);
	const { markedDates, selectedDate } = useSelector(
		(state: RootState) => state.calendar
	);
	const { onDayPress } = useEvents();
	const { resetAllEvents } = useResetEvents();
	const { createPastEvents } = useCreatePastEvents();

	const handleDayPress = useCallback(
		(day: Day) => {
			if (showEventForm) setShowEventForm(false);
			onDayPress(day);
		},
		[showEventForm, onDayPress]
	);

	return (
		<SafeAreaView style={homePageStyles.container}>
			<View style={homePageStyles.contentContainer}>
				<ButtonGroup
					resetAllEvents={resetAllEvents}
					createPastEvents={createPastEvents}
				/>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={homePageStyles.scrollContent}
					accessibilityLabel='Calendar and events list'
				>
					<CalendarComponent
						onDayPress={handleDayPress}
						markedDates={markedDates}
					/>
					<EventListComponent
						showEventForm={showEventForm}
						setShowEventForm={setShowEventForm}
						selectedDate={selectedDate}
					/>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
