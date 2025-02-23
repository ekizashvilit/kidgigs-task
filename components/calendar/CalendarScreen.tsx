import styles from '@/styles/calendar.styles';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSelectedDate } from '@/store/slices/calendarSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calendarTheme } from '@/constants/calendarTheme';

const CalendarScreen = () => {
	const dispatch = useDispatch();
	const { markedDates } = useSelector((state: RootState) => state.calendar);
	const [events, setEvents] = useState<{ [key: string]: string[] }>({});
	const [selectedDateEvents, setSelectedDateEvents] = useState<string[]>([]);

	useEffect(() => {
		const loadEvents = async () => {
			const storedEvents = await AsyncStorage.getItem('events');
			if (storedEvents) {
				setEvents(JSON.parse(storedEvents));
			}
		};
		loadEvents();
	}, []);

	const onDayPress = useCallback(
		async (day) => {
			dispatch(setSelectedDate(day.dateString));
			const dateEvents = events[day.dateString] || [];
			setSelectedDateEvents(dateEvents);
		},
		[dispatch, events]
	);

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
				<View style={styles.eventContainer}>
					{selectedDateEvents.length > 0 ? (
						selectedDateEvents.map((event, index) => (
							<Text key={index} style={styles.eventText}>
								{event}
							</Text>
						))
					) : (
						<Text style={styles.eventText}>No events</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CalendarScreen;
