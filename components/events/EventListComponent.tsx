import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import EventForm from '../forms/EventForm';
import NoEventsMessage from '../NoEventsMessage';
import NewEventFormCard from './NewEventFormCard';
import { useDateUtils } from '@/hooks/useDateUtils';
import eventFormStyles from '@/styles/eventForm.styles';
import { EventListComponentProps } from '@/types/events';

const EventListComponent: React.FC<EventListComponentProps> = ({
	showEventForm,
	setShowEventForm,
	selectedDate,
}) => {
	const { selectedDateEvents } = useSelector(
		(state: RootState) => state.events
	);
	const { isDateInPast } = useDateUtils();

	if (!selectedDate) {
		return null;
	}

	const isPastDate = isDateInPast(selectedDate);
	const closeForm = () => setShowEventForm(false);
	const openForm = () => setShowEventForm(true);

	if (isPastDate && selectedDateEvents.length === 0) {
		return (
			<View style={eventFormStyles.noEventsContainer}>
				<Text style={eventFormStyles.noEventsText}>
					No events was scheduled for{' '}
					{new Date(selectedDate).toLocaleDateString('en-US', {
						month: 'long',
						day: 'numeric',
					})}
				</Text>
			</View>
		);
	}

	return (
		<View>
			{!isPastDate && (
				<>
					{showEventForm ? (
						<View style={{ marginBottom: 16 }}>
							<NewEventFormCard
								selectedDate={selectedDate}
								onClose={closeForm}
							/>
						</View>
					) : (
						<View style={{ marginBottom: 16 }}>
							<NoEventsMessage
								onCreateEvent={openForm}
								isEmpty={selectedDateEvents.length === 0}
							/>
						</View>
					)}
				</>
			)}

			{selectedDateEvents.map((event) => (
				<View key={event.id} style={{ marginBottom: 12 }}>
					<EventForm
						event={event}
						isEditMode={false}
						selectedDate={selectedDate}
						onFormClose={closeForm}
						readOnly={isPastDate}
					/>
				</View>
			))}

			{isPastDate && selectedDateEvents.length > 0 && (
				<View style={eventFormStyles.noEventsContainer}>
					<Text style={eventFormStyles.noEventsText}>
						Events from the past cannot be modified
					</Text>
				</View>
			)}
		</View>
	);
};

export default React.memo(EventListComponent);
