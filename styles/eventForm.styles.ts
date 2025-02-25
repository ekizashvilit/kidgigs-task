import { StyleSheet } from 'react-native';

const eventFormStyles = StyleSheet.create({
	container: {
		padding: 20,
		borderRadius: 15,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgba(149, 157, 165, 0.2)',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 1,
		shadowRadius: 24,
		elevation: 5,
		width: '80%',
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
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		backgroundColor: '#FFFFFF',
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
		borderRadius: 8,
		padding: 12,
		backgroundColor: '#FFFFFF',
	},
	select: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		backgroundColor: '#FFFFFF',
	},
	optionsContainer: {
		position: 'absolute',
		top: '100%',
		left: 0,
		right: 0,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		zIndex: 1000,
	},
	option: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	saveButton: {
		backgroundColor: '#FFB404',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
	saveButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	noEventsContainer: {
		alignItems: 'center',
		marginTop: 20,
	},
	noEventsText: {
		fontSize: 16,
		color: '#261E53',
		textAlign: 'center',
		marginTop: 20,
	},
	createEventButton: {
		marginTop: 10,
		padding: 10,
		backgroundColor: '#FFB404',
		borderRadius: 5,
	},
	createEventButtonText: {
		color: 'white',
		fontSize: 16,
	},
	cardContainer: {
		marginTop: 20,
		borderRadius: 15,
		width: '80%',
		alignSelf: 'center',
		padding: 20,
		backgroundColor: '#FFFFFF',
		shadowColor: 'rgba(149, 157, 165, 0.2)',
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 1,
		shadowRadius: 24,
		elevation: 5,
	},
	closeButton: {
		alignSelf: 'flex-end',
		padding: 5,
	},
	eventContainer: {
		padding: 20,
		backgroundColor: '#FFF',
		borderRadius: 15,
		width: '80%',
		marginHorizontal: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	eventText: {
		fontSize: 16,
	},
});

export default eventFormStyles;
