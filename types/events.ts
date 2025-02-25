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
	selectedDate: string | null;
}

export interface EventFormProps {
	event: any | null;
	isEditMode: boolean;
	selectedDate?: string | null;
}

export interface Day {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}
