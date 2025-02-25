export interface CalendarState {
	selectedDate: string | null;
	markedDates: {
		[key: string]: {
			selected: boolean;
			selectedColor: string;
			selectedTextColor: string;
		};
	};
}

export interface CalendarComponentProps {
	onDayPress: (day: any) => void;
	markedDates: { [key: string]: any };
}
