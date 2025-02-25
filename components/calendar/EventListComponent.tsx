import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity } from 'react-native';

import EventForm from '../forms/EventForm';
import eventFormStyles from '@/styles/eventForm.styles';
import { EventListComponentProps } from '@/types/events';

const EventListComponent: React.FC<EventListComponentProps> = ({
	selectedDateEvents,
	onCreateEvent,
	showEventForm,
	setShowEventForm,
	selectedDate,
}) => {
	const handleCreateEvent = () => {
		setShowEventForm(true);
		onCreateEvent();
	};

	const handleCloseForm = () => {
		setShowEventForm(false);
	};

	return (
		<View style={eventFormStyles.noEventsContainer}>
			{selectedDateEvents.length > 0 ? (
				<>
					{selectedDateEvents.map((event, index) => (
						<EventForm key={index} event={event} isEditMode={true} />
					))}
					<TouchableOpacity
						style={eventFormStyles.createEventButton}
						onPress={handleCreateEvent}
					>
						<Text style={eventFormStyles.createEventButtonText}>
							Create New Event
						</Text>
					</TouchableOpacity>
				</>
			) : (
				<>
					{!showEventForm && (
						<>
							<Text style={eventFormStyles.noEventsText}>No events</Text>
							<TouchableOpacity
								style={eventFormStyles.createEventButton}
								onPress={handleCreateEvent}
							>
								<Text style={eventFormStyles.createEventButtonText}>
									Create New Event
								</Text>
							</TouchableOpacity>
						</>
					)}
					{showEventForm && (
						<View style={eventFormStyles.cardContainer}>
							<TouchableOpacity
								style={eventFormStyles.closeButton}
								onPress={handleCloseForm}
							>
								<Icon name='x' size={24} color='#261E53' />
							</TouchableOpacity>
							<EventForm
								isEditMode={false}
								event={null}
								selectedDate={selectedDate}
							/>
						</View>
					)}
				</>
			)}
		</View>
	);
};

export default EventListComponent;
