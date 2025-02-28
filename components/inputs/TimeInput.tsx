import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimeInput = ({
	control,
	name,
	style,
}: {
	control: any;
	name: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [showTimePicker, setShowTimePicker] = useState(false);

	const formatTimeString = (date: Date): string => {
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:00`;
	};

	const displayTimeString = (timeString: string): string => {
		if (!timeString) return 'Select Time';
		const [hours, minutes] = timeString.split(':');
		return `${hours}:${minutes}`;
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => {
				let dateForPicker = new Date();
				if (typeof value === 'string' && value.includes(':')) {
					const [hours, minutes] = value.split(':').map(Number);
					dateForPicker.setHours(hours);
					dateForPicker.setMinutes(minutes);
					dateForPicker.setSeconds(0);
				}

				return (
					<>
						<TouchableOpacity
							style={style}
							onPress={() => setShowTimePicker(true)}
						>
							<Text>{value ? displayTimeString(value) : 'Select Time'}</Text>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={showTimePicker}
							mode='time'
							date={dateForPicker}
							onConfirm={(selectedTime) => {
								setShowTimePicker(false);
								const timeString = formatTimeString(selectedTime);
								onChange(timeString);
							}}
							onCancel={() => setShowTimePicker(false)}
						/>
					</>
				);
			}}
		/>
	);
};

export default TimeInput;
