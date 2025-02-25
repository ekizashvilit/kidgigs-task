import React from 'react';
import { Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { DateInputProps } from '@/types/inputs';

const DateInput: React.FC<DateInputProps> = ({ control, name, style }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value } }) => (
				<View style={[style, { opacity: 0.5 }]}>
					<Text>
						{value ? new Date(value).toLocaleDateString() : 'Select Date'}
					</Text>
				</View>
			)}
		/>
	);
};

export default DateInput;
