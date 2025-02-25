import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { EventFormProps } from '@/types/events';

export const useEventForm = (
	event?: EventFormProps['event'],
	selectedDate?: string | null
) => {
	const { control, reset } = useForm();

	useEffect(() => {
		if (event) {
			reset({
				eventName: event.eventName,
				startDate: event.startDate ? new Date(event.startDate) : null,
				startTime: event.startTime
					? new Date(`1970-01-01T${event.startTime}`)
					: null,
				endDate: event.endDate ? new Date(event.endDate) : null,
				endTime: event.endTime ? new Date(`1970-01-01T${event.endTime}`) : null,
				repeat: event.repeat,
			});
		} else if (selectedDate) {
			const dateObj = new Date(selectedDate);
			reset({
				eventName: '',
				startDate: dateObj,
				startTime: null,
				endDate: dateObj,
				endTime: null,
				repeat: 'none',
			});
		}
	}, [event, selectedDate, reset]);

	return { control };
};
