import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Controller, FieldErrors } from 'react-hook-form';

import eventFormStyles from '@/styles/eventForm.styles';

interface EventNameInputProps {
	control: any;
	errors: FieldErrors;
}

const EventNameInput: React.FC<EventNameInputProps> = ({ control, errors }) => (
	<Controller
		control={control}
		name='eventName'
		rules={{ required: 'Event name is required' }}
		render={({ field: { onChange, value } }) => (
			<View style={eventFormStyles.inputContainer}>
				<Text style={eventFormStyles.label}>Event Name</Text>
				<TextInput
					style={eventFormStyles.input}
					onChangeText={onChange}
					value={value}
					placeholder='Enter event name'
					placeholderTextColor='#999999'
					accessibilityLabel='Event Name Input'
				/>
				{errors.eventName && (
					<Text style={eventFormStyles.errorText}>
						{typeof errors.eventName.message === 'string' &&
							errors.eventName.message}
					</Text>
				)}
			</View>
		)}
	/>
);

export default EventNameInput;
