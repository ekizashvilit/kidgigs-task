import React from 'react';
import { Controller } from 'react-hook-form';
import { StyleProp, ViewStyle, Text, View, StyleSheet } from 'react-native';

const DateInput = ({
	control,
	name,
	style,
}: {
	control: any;
	name: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const formatDisplayDate = (dateStr: string): string => {
		if (!dateStr) return 'No Date Selected';
		const date = new Date(dateStr);
		return date.toLocaleDateString();
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value } }) => {
				return (
					<View style={[styles.disabledContainer, style]}>
						<Text style={styles.disabledText}>
							{value ? formatDisplayDate(value) : 'No Date Selected'}
						</Text>
					</View>
				);
			}}
		/>
	);
};

const styles = StyleSheet.create({
	disabledContainer: {
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#f2f2f2',
		opacity: 0.8,
		borderWidth: 1,
		borderColor: '#d3d3d3',
	},
	disabledText: {
		color: '#757575',
	},
});

export default DateInput;
