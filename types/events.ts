export interface Event {
	id: string;
	eventName: string;
	startDate: string;
	startTime: string;
	endDate: string;
	endTime: string;
	repeat: 'weekly' | 'bi-weekly' | 'monthly' | 'none';
}

export interface EventListComponentProps {
	showEventForm: boolean;
	setShowEventForm: (show: boolean) => void;
	selectedDate: string | null;
}

export interface EventFormProps {
	event: Event | null;
	isEditMode: boolean;
	selectedDate?: string | null;
	onFormClose?: () => void;
	readOnly?: boolean;
}

export interface EventsState {
	events: Record<string, Event[]>;
	selectedDateEvents: Event[];
}

export interface Day {
	dateString: string;
	day: number;
	month: number;
	timestamp: number;
	year: number;
}

export interface EventFormData {
	eventName: string;
	startDate?: string;
	startTime: Date | string | null;
	endDate?: string;
	endTime: Date | string | null;
	repeat?: 'weekly' | 'bi-weekly' | 'monthly' | 'none';
}
