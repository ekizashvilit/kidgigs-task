import { StyleSheet, Platform, StatusBar } from 'react-native';

const homePageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f3f3',
	},
	contentContainer: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	scrollContent: {
		paddingBottom: 20,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
		marginVertical: 10,
		margin: 'auto',
		width: '90%',
	},
	resetButton: {
		flex: 1,
	},
});

export default homePageStyles;
