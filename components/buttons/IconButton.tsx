import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleProp, ViewStyle, Animated, Pressable } from 'react-native';

interface IconButtonProps {
	onPress: () => void;
	iconName: string;
	variant?: 'primary' | 'danger' | 'secondary';
	style?: StyleProp<ViewStyle>;
	size?: number;
	accessibilityLabel?: string;
	accessibilityHint?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	onPress,
	iconName,
	variant = 'primary',
	style,
	size = 20,
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

	const getGradientColors = (): [string, string] => {
		switch (variant) {
			case 'danger':
				return ['#FF6B6B', '#FF3333'];
			case 'secondary':
				return ['#E0E0E0', '#CCCCCC'];
			case 'primary':
			default:
				return ['#FFD623', '#FFB400'];
		}
	};

	const getIconColor = () => {
		switch (variant) {
			case 'secondary':
				return '#555555';
			case 'danger':
			case 'primary':
			default:
				return '#FFFFFF';
		}
	};

	const buttonSize = Math.max(size + 20, 40);

	return (
		<Pressable
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			accessibilityLabel={accessibilityLabel || `${iconName} button`}
			accessibilityHint={accessibilityHint}
			style={[{ marginVertical: 8 }, style]}
		>
			<Animated.View
				style={{
					transform: [{ scale: animatedScale }],
					borderRadius: buttonSize / 2,
					overflow: 'hidden',
				}}
			>
				<LinearGradient
					colors={getGradientColors()}
					style={{
						width: buttonSize,
						height: buttonSize,
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: buttonSize / 2,
						boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
						elevation: 3,
					}}
				>
					<Icon name={iconName} size={size} color={getIconColor()} />
				</LinearGradient>
			</Animated.View>
		</Pressable>
	);
};

export default IconButton;
