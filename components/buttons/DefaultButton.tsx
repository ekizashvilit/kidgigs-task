import React from 'react';
import {
	Text,
	StyleProp,
	ViewStyle,
	TextStyle,
	Animated,
	Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps {
	onPress: () => void;
	title: string;
	variant?: 'primary' | 'danger';
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	accessibilityLabel?: string;
	accessibilityHint?: string;
}

const DefaultButton: React.FC<ButtonProps> = ({
	onPress,
	title,
	variant = 'primary',
	style,
	textStyle,
	accessibilityLabel,
	accessibilityHint,
}) => {
	const animatedScale = React.useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(animatedScale, {
			toValue: 0.95,
			friction: 5,
			tension: 300,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(animatedScale, {
			toValue: 1,
			friction: 3,
			tension: 400,
			useNativeDriver: true,
		}).start();
	};

	const getGradientColors = (): [string, string, ...string[]] => {
		switch (variant) {
			case 'danger':
				return ['#FF6B6B', '#FF3333'];
			case 'primary':
			default:
				return ['#FFD623', '#FFB400'];
		}
	};

	return (
		<Pressable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			accessibilityLabel={accessibilityLabel || title}
			accessibilityHint={accessibilityHint}
			style={[{ marginVertical: 8 }, style]}
		>
			<Animated.View
				style={{
					transform: [{ scale: animatedScale }],
					borderRadius: 16,
					overflow: 'hidden',
				}}
			>
				<LinearGradient
					colors={getGradientColors()}
					style={{
						padding: 14,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 16,
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
						elevation: 3,
					}}
				>
					<Text
						style={[
							{
								fontSize: 16,
								fontWeight: 'bold',
								color: '#fff',
							},
							textStyle,
						]}
					>
						{title}
					</Text>
				</LinearGradient>
			</Animated.View>
		</Pressable>
	);
};

export default DefaultButton;
