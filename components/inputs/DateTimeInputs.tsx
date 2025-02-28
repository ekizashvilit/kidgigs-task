import React from 'react';
import { View, Text } from 'react-native';

import DateInput from '../inputs/DateInput';
import TimeInput from '../inputs/TimeInput';
import eventFormStyles from '@/styles/eventForm.styles';

interface DateTimeInputsProps {
	control: any;
	startOrEnd: 'start' | 'end';
}

const DateTimeInputs: React.FC<DateTimeInputsProps> = ({
	control,
	startOrEnd,
}) => (
	<>
		<Text style={eventFormStyles.label}>{`${
			startOrEnd === 'start' ? 'Starts' : 'Ends'
		}`}</Text>
		<View style={eventFormStyles.dateTimeContainer}>
			<DateInput
				control={control}
				name={`${startOrEnd}Date`}
				style={eventFormStyles.dateTimeInput}
			/>
			<TimeInput
				control={control}
				name={`${startOrEnd}Time`}
				style={eventFormStyles.dateTimeInput}
			/>
		</View>
	</>
);

export default DateTimeInputs;
