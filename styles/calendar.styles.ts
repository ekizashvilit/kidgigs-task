import { StyleSheet, Platform } from 'react-native';

const calendarStyles = StyleSheet.create({
	calendar: {
		marginTop: 40,
		borderRadius: 15,
		width: '90%',
		alignSelf: 'center',
		padding: 20,
		...(Platform.OS === 'web'
			? { boxShadow: '0px 8px 10px rgba(149, 157, 165, 0.2)' }
			: {
					shadowOffset: {
						width: 0,
						height: 8,
					},
					shadowOpacity: 0.25,
					shadowRadius: 10,
			  }),
		elevation: 5,
		marginBottom: 20,
	},
});

export default calendarStyles;
