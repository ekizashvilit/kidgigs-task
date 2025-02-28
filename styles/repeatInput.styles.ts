import { StyleSheet } from 'react-native';

const repeatInputStyles = StyleSheet.create({
	inputContainer: {
		marginVertical: 10,
	},
	label: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	select: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 10,
		backgroundColor: '#fff',
	},
	selectText: {
		fontSize: 16,
		color: '#333',
	},
	optionsContainer: {
		marginTop: 5,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		backgroundColor: '#fff',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
	},
	option: {
		padding: 10,
	},
	optionText: {
		fontSize: 16,
		color: '#333',
	},
});

export default repeatInputStyles;
