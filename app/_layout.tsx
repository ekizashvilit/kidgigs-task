import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from '@/store/store';

export default function RootLayout(): JSX.Element {
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<StatusBar style='dark' />
				<Stack>
					<Stack.Screen name='index' options={{ headerShown: false }} />
				</Stack>
			</SafeAreaProvider>
		</Provider>
	);
}
