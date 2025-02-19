import { Colors } from '@/constants/Colors';
import { View, type ViewProps } from 'react-native';

export type StyledViewProps = ViewProps & {
  backgroundColor?: string;
};

export function StyledView({ style, backgroundColor = Colors.background, ...otherProps }: StyledViewProps) {
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}