import { Platform, StyleSheet } from 'react-native';

const eventFormStyles = StyleSheet.create({
	container: {
		padding: 20,
		paddingTop: 40,
		borderRadius: 15,
		backgroundColor: '#FFFFFF',
		...(Platform.OS === 'web'
			? { boxShadow: '0px 4px 12px rgba(149, 157, 165, 0.15)' }
			: {
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.15,
					shadowRadius: 12,
			  }),
		elevation: 3,
		width: '90%',
		alignSelf: 'center',
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		fontWeight: '500',
		color: '#261E53',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 12,
		fontSize: 16,
		backgroundColor: '#FFFFFF',
	},
	readOnlyValue: {
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 10,
		padding: 12,
		fontSize: 16,
		backgroundColor: '#F5F5F5',
		color: '#555555',
		marginBottom: 20,
	},
	dateTimeContainer: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 20,
	},
	dateTimeInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 12,
		backgroundColor: '#FFFFFF',
	},
	readOnlyDateTime: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#e0e0e0',
		borderRadius: 10,
		padding: 12,
		backgroundColor: '#F5F5F5',
		color: '#555555',
	},

	closeButtonContainer: {
		position: 'absolute',
		top: 0,
		right: 32,
		zIndex: 1,
	},
	closeButton: {
		padding: 5,
	},

	noEventsContainer: {
		paddingVertical: 30,
		width: '90%',
		margin: 'auto',
	},
	noEventsText: {
		fontSize: 16,
		color: '#261E53',
		textAlign: 'center',
		fontWeight: 'bold',
		marginBottom: 20,
	},
	formContainer: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 30,
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
	},
	editButton: {
		position: 'absolute',
		top: -5,
		right: 15,
		zIndex: 1,
		padding: 8,
		backgroundColor: 'transparent',
		borderRadius: 20,
		shadowColor: 'transparent',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	},
	errorText: {
		color: 'red',
	},
});

export default eventFormStyles;
