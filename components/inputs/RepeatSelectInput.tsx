import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';

import eventFormStyles from '@/styles/eventForm.styles';

const repeatOptions = [
	{ label: 'Weekly', value: 'weekly' },
	{ label: 'Bi-weekly', value: 'bi-weekly' },
	{ label: 'Monthly', value: 'monthly' },
];

const RepeatSelect = ({ control, name }: { control: any; name: string }) => {
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<View style={eventFormStyles.inputContainer}>
					<Text style={eventFormStyles.label}>Repeat</Text>
					<TouchableOpacity
						style={eventFormStyles.select}
						onPress={() => setIsSelectOpen(!isSelectOpen)}
					>
						<Text>{value || 'Select repeat option'}</Text>
					</TouchableOpacity>
					{isSelectOpen && (
						<View style={eventFormStyles.optionsContainer}>
							{repeatOptions.map((option) => (
								<TouchableOpacity
									key={option.value}
									style={eventFormStyles.option}
									onPress={() => {
										onChange(option.value);
										setIsSelectOpen(false);
									}}
								>
									<Text>{option.label}</Text>
								</TouchableOpacity>
							))}
						</View>
					)}
				</View>
			)}
		/>
	);
};

export default RepeatSelect;
