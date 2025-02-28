import React from 'react';
import { StyleSheet } from 'react-native';
import { Control, FieldErrors } from 'react-hook-form';

import { Event } from '@/types/events';
import FormButtons from '../buttons/FormButtons';
import EventNameInput from '../inputs/EventNameInput';
import DateTimeInputs from '../inputs/DateTimeInputs';
import RepeatSelect from '../inputs/RepeatSelectInput';

type EventFormData = Omit<Event, 'id'>;

interface EventEditViewProps {
	control: Control<EventFormData>;
	errors: FieldErrors<EventFormData>;
	isEditMode: boolean;
	handleSubmit: (onSubmit: any) => () => void;
	onSubmit: (data: EventFormData) => void;
	handleDelete?: () => void;
	onCancel?: () => void;
}

const EventEditView: React.FC<EventEditViewProps> = ({
	control,
	errors,
	isEditMode,
	handleSubmit,
	onSubmit,
	handleDelete,
	onCancel,
}) => {
	return (
		<>
			<EventNameInput control={control} errors={errors} />
			<DateTimeInputs control={control} startOrEnd='start' />
			<DateTimeInputs control={control} startOrEnd='end' />
			<RepeatSelect control={control} name='repeat' />
			<FormButtons
				isEditMode={isEditMode}
				onSubmit={handleSubmit(onSubmit)}
				onDelete={handleDelete}
				onCancel={onCancel}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	errorText: {
		color: 'red',
		marginBottom: 8,
	},
});

export default EventEditView;
