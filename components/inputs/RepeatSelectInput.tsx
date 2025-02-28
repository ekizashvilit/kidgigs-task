import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { View, Text, TouchableOpacity } from 'react-native';

import repeatInputStyles from '@/styles/repeatInput.styles';

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
				<View style={repeatInputStyles.inputContainer}>
					<Text style={repeatInputStyles.label}>Repeat</Text>
					<TouchableOpacity
						style={repeatInputStyles.select}
						onPress={() => setIsSelectOpen(!isSelectOpen)}
					>
						<Text style={repeatInputStyles.selectText}>
							{value || 'Select repeat option'}
						</Text>
					</TouchableOpacity>
					{isSelectOpen && (
						<View style={repeatInputStyles.optionsContainer}>
							{repeatOptions.map((option) => (
								<TouchableOpacity
									key={option.value}
									style={repeatInputStyles.option}
									onPress={() => {
										onChange(option.value);
										setIsSelectOpen(false);
									}}
								>
									<Text style={repeatInputStyles.optionText}>
										{option.label}
									</Text>
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
