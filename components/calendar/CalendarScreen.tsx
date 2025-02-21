import styles from '@/styles/calendar.styles';
import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedDate } from '@/store/slices/calendarSlice';

const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { markedDates } = useSelector((state: RootState) => state.calendar);

	const onDayPress = useCallback(
		(day) => {
			dispatch(setSelectedDate(day.dateString));
		},
		[dispatch]
	);

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
					current={new Date().toISOString().split('T')[0]}
					style={styles.calendar}
					onDayPress={onDayPress}
					markedDates={markedDates}
					theme={calendarTheme}
					renderArrow={renderArrow}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CalendarScreen;
