import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { DateInputProps } from '@/types/inputs';

const DateInput: React.FC<DateInputProps> = ({ control, name, style }) => {
	const [showDatePicker, setShowDatePicker] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<>
					<TouchableOpacity
						style={style}
						onPress={() => setShowDatePicker(true)}
					>
						<Text>
							{value ? new Date(value).toLocaleDateString() : 'Select Date'}
						</Text>
					</TouchableOpacity>
					{showDatePicker && (
						<DateTimePicker
							value={value ? new Date(value) : new Date()}
							mode='date'
							onChange={(event, selectedDate) => {
								setShowDatePicker(Platform.OS === 'ios');
								if (event.type !== 'dismissed') {
									onChange(selectedDate);
								}
							}}
						/>
					)}
				</>
			)}
		/>
	);
};

export default DateInput;
