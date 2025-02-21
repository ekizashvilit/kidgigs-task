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
