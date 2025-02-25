import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<>
					<TouchableOpacity
						style={style}
						onPress={() => setShowTimePicker(true)}
					>
						<Text>
							{value ? new Date(value).toLocaleTimeString() : 'Select Time'}
						</Text>
					</TouchableOpacity>
					{showTimePicker && (
						<DateTimePicker
							value={value ? new Date(value) : new Date()}
							mode='time'
							onChange={(event, selectedTime) => {
								setShowTimePicker(Platform.OS === 'ios');
								if (event.type !== 'dismissed') {
									onChange(selectedTime);
								}
							}}
						/>
					)}
				</>
			)}
		/>
	);
};

export default TimeInput;
