export interface CalendarMarking {
	selected?: boolean;
	selectedColor?: string;
	selectedTextColor?: string;
	marked?: boolean;
	dotColor?: string;
}

export interface CalendarState {
	selectedDate: string | null;
	markedDates: {
		[key: string]: CalendarMarking;
	};
}

export interface CalendarComponentProps {
	onDayPress: (day: any) => void;
	markedDates: { [key: string]: CalendarMarking };
}
