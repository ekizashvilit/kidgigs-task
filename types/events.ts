export interface Event {
	eventName: string;
	starts: { date: string; time: string };
	ends: { date: string; time: string };
	repeat: 'weekly' | 'bi-weekly' | 'monthly' | 'none';
}

export interface EventListComponentProps {
	selectedDateEvents: any[];
	onCreateEvent: () => void;
	showEventForm: boolean;
	setShowEventForm: (show: boolean) => void;
}

export interface EventFormProps {
	event: {
		eventName: string;
		startDate: string | null;
		startTime: string | null;
		endDate: string | null;
		endTime: string | null;
		repeat: string;
	} | null;
	isEditMode: boolean;
}

export interface Day {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}
