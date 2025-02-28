import React from 'react';
import { View, StyleSheet } from 'react-native';

import DefaultButton from './DefaultButton';

interface FormButtonsProps {
	isEditMode: boolean;
	onSubmit: () => void;
	onDelete: () => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
	isEditMode,
	onSubmit,
	onDelete,
}) => (
	<>
		{!isEditMode ? (
			<DefaultButton
				title='Save'
				variant='primary'
				onPress={onSubmit}
				accessibilityLabel='Save Event Button'
			/>
		) : (
			<View style={styles.editButtonsContainer}>
				<DefaultButton
					title='Update'
					variant='primary'
					onPress={onSubmit}
					accessibilityLabel='Update Event Button'
					style={styles.button}
				/>
				<DefaultButton
					title='Delete'
					variant='danger'
					onPress={onDelete}
					accessibilityLabel='Delete Event Button'
					style={styles.button}
				/>
			</View>
		)}
	</>
);

const styles = StyleSheet.create({
	editButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		flex: 0.48,
	},
});

export default FormButtons;
