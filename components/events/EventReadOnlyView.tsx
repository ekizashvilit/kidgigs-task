import React from 'react';
import { Text, View } from 'react-native';

import { Event } from '@/types/events';
import eventFormStyles from '@/styles/eventForm.styles';

interface EventReadOnlyViewProps {
	event: Event;
}

const EventReadOnlyView: React.FC<EventReadOnlyViewProps> = ({ event }) => {
	const renderReadOnlyField = (label: string, value: string) => (
		<>
			<Text style={eventFormStyles.label} accessibilityRole='text'>
				{label}
			</Text>
			<Text
				style={eventFormStyles.readOnlyValue}
				accessibilityLabel={`${label}: ${value}`}
			>
				{value}
			</Text>
		</>
	);

	const renderReadOnlyDateTime = (
		label: string,
		date: string,
		time: string
	) => (
		<>
			<Text style={eventFormStyles.label} accessibilityRole='text'>
				{label}
			</Text>
			<View style={eventFormStyles.dateTimeContainer}>
				<Text
					style={eventFormStyles.readOnlyDateTime}
					accessibilityLabel={`${label} date: ${date}`}
				>
					{date}
				</Text>
				<Text
					style={eventFormStyles.readOnlyDateTime}
					accessibilityLabel={`${label} time: ${time}`}
				>
					{time}
				</Text>
			</View>
		</>
	);

	return (
		<View>
			{renderReadOnlyField('Event Name', event.eventName)}
			{renderReadOnlyDateTime('Starts', event.startDate, event.startTime)}
			{renderReadOnlyDateTime('Ends', event.endDate, event.endTime)}
			{renderReadOnlyField('Repeat', event.repeat)}
		</View>
	);
};

export default EventReadOnlyView;
