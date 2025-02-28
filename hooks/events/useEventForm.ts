import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { EventFormProps, EventFormData } from '@/types/events';

const getCurrentTimeString = (): string => {
	const now = new Date();
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}:00`;
};

const getEndTimeString = (): string => {
	const now = new Date();
	now.setHours(now.getHours() + 1);
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	return `${hours}:${minutes}:00`;
};

export const useEventForm = (
	event?: EventFormProps['event'],
	selectedDate?: string | null
) => {
	const currentTime = getCurrentTimeString();
	const endTime = getEndTimeString();

	const defaultValues: EventFormData = {
		eventName: event?.eventName || '',
		startDate: event?.startDate || selectedDate || '',
		startTime: event?.startTime || currentTime,
		endDate: event?.endDate || selectedDate || '',
		endTime: event?.endTime || endTime,
		repeat: event?.repeat || 'none',
	};

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<EventFormData>({
		defaultValues,
		mode: 'onBlur',
		criteriaMode: 'all',
		resolver: async (data) => {
			return {
				values: data,
				errors: !data.eventName.trim()
					? {
							eventName: {
								type: 'required',
								message: 'Event name is required',
							},
					  }
					: {},
			};
		},
	});

	useEffect(() => {
		reset({
			eventName: event?.eventName || '',
			startDate: event?.startDate || selectedDate || '',
			startTime: event?.startTime || currentTime,
			endDate: event?.endDate || selectedDate || '',
			endTime: event?.endTime || endTime,
			repeat: event?.repeat || 'none',
		});
	}, [event, selectedDate, reset, currentTime, endTime]);

	return { control, handleSubmit, errors };
};
