import React from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import DateInput from '../inputs/DateInput';
import TimeInput from '../inputs/TimeInput';
import { EventFormProps } from '@/types/events';
import { useEventForm } from '@/hooks/useEventForm';
import RepeatSelect from '../inputs/RepeatSelectInput';
import eventFormStyles from '@/styles/eventForm.styles';

const EventForm: React.FC<EventFormProps> = ({ event, isEditMode }) => {
	const { control } = useEventForm(event);

	return (
		<View style={eventFormStyles.container}>
			<Controller
				control={control}
				name='eventName'
				render={({ field: { onChange, value } }) => (
					<View style={eventFormStyles.inputContainer}>
						<Text style={eventFormStyles.label}>Event Name</Text>
						<TextInput
							style={eventFormStyles.input}
							onChangeText={onChange}
							value={value}
							placeholder='Enter event name'
						/>
					</View>
				)}
			/>

			<Text style={eventFormStyles.label}>Starts</Text>
			<View style={eventFormStyles.dateTimeContainer}>
				<DateInput
					control={control}
					name='startDate'
					style={eventFormStyles.dateTimeInput}
				/>
				<TimeInput
					control={control}
					name='startTime'
					style={eventFormStyles.dateTimeInput}
				/>
			</View>

			<Text style={eventFormStyles.label}>Ends</Text>
			<View style={eventFormStyles.dateTimeContainer}>
				<DateInput
					control={control}
					name='endDate'
					style={eventFormStyles.dateTimeInput}
				/>
				<TimeInput
					control={control}
					name='endTime'
					style={eventFormStyles.dateTimeInput}
				/>
			</View>

			<RepeatSelect control={control} name='repeat' />

			{!isEditMode && (
				<TouchableOpacity style={eventFormStyles.saveButton}>
					<Text style={eventFormStyles.saveButtonText}>Save</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default EventForm;
