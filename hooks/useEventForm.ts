import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EventFormProps } from '@/types/events';

export const useEventForm = (event?: EventFormProps['event']) => {
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
		}
	}, [event, reset]);

	return { control };
};
