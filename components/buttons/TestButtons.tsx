import React from 'react';
import { View } from 'react-native';

import homePageStyles from '@/styles/homePage.styles';
import DefaultButton from '@/components/buttons/DefaultButton';

interface ButtonGroupProps {
	resetAllEvents: () => void;
	createPastEvents: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
	resetAllEvents,
	createPastEvents,
}) => {
	return (
		<View style={homePageStyles.buttonContainer}>
			<DefaultButton
				title='Reset Events'
				variant='danger'
				onPress={resetAllEvents}
				style={homePageStyles.resetButton}
				accessibilityLabel='Reset all events'
				accessibilityHint='Deletes all scheduled events from the calendar'
			/>
			<DefaultButton
				title='Create Events'
				variant='primary'
				onPress={createPastEvents}
				style={homePageStyles.resetButton}
				accessibilityLabel='Create test past events'
				accessibilityHint='Creates test events from Feb 20-26, 2025'
			/>
		</View>
	);
};

export default ButtonGroup;
