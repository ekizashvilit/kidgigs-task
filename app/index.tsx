import CalendarScreen from '@/components/calendar/CalendarScreen';
import { View, StyleSheet } from 'react-native';

export default function HomePage() {
	return (
		<View style={styles.container}>
			<CalendarScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});
