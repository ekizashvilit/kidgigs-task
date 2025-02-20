import styles from '@/styles/calendar.styles';
import React, { useState, useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Calendar, CalendarUtils } from 'react-native-calendars';

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
				selectedColor: '#E5E5E5',
				disableTouchEvent: false,
			},
		};

		if (selected) {
			markedDates[selected] = {
				selected: true,
				selectedColor: 'orange',
				selectedTextColor: 'red',
			};
		}

		return markedDates;
	}, [selected, today]);

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Calendar
				enableSwipeMonths
				current={today}
				style={styles.calendar}
				onDayPress={onDayPress}
				markedDates={marked}
			/>
		</ScrollView>
	);
};

export default CalendarScreen;
