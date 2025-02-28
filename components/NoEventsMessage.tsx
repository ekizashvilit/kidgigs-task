import React from 'react';
import { Text, View } from 'react-native';

import DefaultButton from './buttons/DefaultButton';
import eventFormStyles from '@/styles/eventForm.styles';

const NoEventsMessage: React.FC<{
	onCreateEvent: () => void;
	isEmpty?: boolean;
}> = ({ onCreateEvent, isEmpty = true }) => (
	<View
		style={
			isEmpty
				? eventFormStyles.noEventsContainer
				: [eventFormStyles.formContainer, { width: '90%' }]
		}
	>
		{isEmpty && <Text style={eventFormStyles.noEventsText}>No events</Text>}
		<DefaultButton
			title='Create New Event'
			variant='primary'
			onPress={onCreateEvent}
			accessibilityLabel='Create new event button'
		/>
	</View>
);

export default NoEventsMessage;
