import { Text, View, StyleSheet } from 'react-native';

export default function HomePage() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>my single page app</Text>
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
