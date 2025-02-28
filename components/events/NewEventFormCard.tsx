import React from 'react';
import { View } from 'react-native';

import EventForm from '../forms/EventForm';
import IconButton from '../buttons/IconButton';
import eventFormStyles from '@/styles/eventForm.styles';

const NewEventFormCard: React.FC<{
	selectedDate: string;
	onClose: () => void;
}> = ({ selectedDate, onClose }) => (
	<View>
		<View style={eventFormStyles.closeButtonContainer}>
			<IconButton
				onPress={onClose}
				iconName='x'
				variant='primary'
				size={24}
				accessibilityLabel='Close event form'
			/>
		</View>
		<EventForm
			isEditMode={true}
			event={null}
			selectedDate={selectedDate}
			onFormClose={onClose}
		/>
	</View>
);

export default NewEventFormCard;
