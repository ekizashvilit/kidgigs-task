import styles from '@/styles/calendar.styles';
import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

const getToday = () => {
	const date = new Date();
	return CalendarUtils.getCalendarDateString(date);
};

const CalendarScreen = () => {
	const [selected, setSelected] = useState<string | null>(null);
	const today = getToday();

	const onDayPress = useCallback((day) => {
		setSelected(day.dateString);
	}, []);

	const marked = useMemo(() => {
		const markedDates = {
			[today]: {
				selected: true,
				selectedColor: '#EBF0F5',
				selectedTextColor: '#736A8F',
			},
		};

		if (selected) {
			markedDates[selected] = {
				selected: true,
				selectedColor: '#FFB404',
				selectedTextColor: 'white',
			};
		}

		return markedDates;
	}, [selected, today]);

	const calendarTheme = {
		dayTextColor: '#817A9B',
		monthTextColor: '#261E53',
		textMonthFontWeight: 'bold',
		textSectionTitleColor: '#261E53',
	};

	const renderArrow = (direction: 'left' | 'right') => {
		const iconName = direction === 'left' ? 'chevron-left' : 'chevron-right';
		return <Icon name={iconName} size={24} color='#261E53' />;
	};

	return (
		<SafeAreaView style={{ flex: 1, width: '100%' }}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Calendar
					enableSwipeMonths
					current={today}
					style={styles.calendar}
					onDayPress={onDayPress}
					markedDates={marked}
					theme={calendarTheme}
					renderArrow={renderArrow}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CalendarScreen;
