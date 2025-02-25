import React from 'react';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

import calendarStyles from '@/styles/calendar.styles';
import { calendarTheme } from '@/constants/calendarTheme';
import { CalendarComponentProps } from '@/types/calendar';

const CalendarComponent: React.FC<CalendarComponentProps> = ({
	onDayPress,
	markedDates,
}) => {
	const renderArrow = (direction: 'left' | 'right') => {
		const iconName = direction === 'left' ? 'chevron-left' : 'chevron-right';
		return <Icon name={iconName} size={24} color='#261E53' />;
	};

	return (
		<Calendar
			enableSwipeMonths
			current={new Date().toISOString().split('T')[0]}
			style={calendarStyles.calendar}
			onDayPress={onDayPress}
			markedDates={markedDates}
			theme={calendarTheme}
			renderArrow={renderArrow}
		/>
	);
};

export default CalendarComponent;
