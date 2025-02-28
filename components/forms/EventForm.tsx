import { View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';

import IconButton from '../buttons/IconButton';
import EventEditView from '../events/EventEditView';
import eventFormStyles from '@/styles/eventForm.styles';
import { useEventForm } from '@/hooks/events/useEventForm';
import EventReadOnlyView from '../events/EventReadOnlyView';
import useEventActions from '@/hooks/events/useEventActions';
import { EventFormData, EventFormProps } from '@/types/events';

const EventForm: React.FC<EventFormProps> = ({
	event,
	isEditMode: initialEditMode,
	selectedDate,
	onFormClose,
	readOnly = false,
}) => {
	const isNewEvent = !event;
	const [isEditMode, setIsEditMode] = useState(
		isNewEvent ? true : initialEditMode || false
	);
	const { control, handleSubmit, errors } = useEventForm(event, selectedDate);
	const { onSubmit: originalOnSubmit, handleDelete } = useEventActions({
		event,
		isEditMode,
		selectedDate,
		onFormClose,
	});

	const onSubmit = async (data: EventFormData) => {
		await originalOnSubmit(data);
		if (!isNewEvent) {
			setIsEditMode(false);
		}
	};

	const toggleEditMode = useCallback(() => {
		setIsEditMode((prev) => !prev);
	}, []);

	const renderContent = () => {
		if (readOnly) {
			return event ? (
				<EventReadOnlyView event={event} />
			) : (
				<Text>No event data available</Text>
			);
		}

		return (
			<>
				{event && !isNewEvent && (
					<View style={eventFormStyles.editButton}>
						<IconButton
							onPress={toggleEditMode}
							iconName={isEditMode ? 'x' : 'edit-2'}
							variant={isEditMode ? 'secondary' : 'primary'}
							size={16}
							accessibilityLabel={
								isEditMode ? 'Cancel edit mode' : 'Edit event'
							}
						/>
					</View>
				)}

				{isEditMode ? (
					<EventEditView
						control={control}
						errors={errors}
						isEditMode={!isNewEvent}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						handleDelete={event ? handleDelete : undefined}
						onCancel={event ? toggleEditMode : onFormClose}
					/>
				) : (
					event && <EventReadOnlyView event={event} />
				)}
			</>
		);
	};

	return (
		<View
			style={eventFormStyles.container}
			accessibilityLabel={readOnly ? 'Read-only Event Details' : 'Event Form'}
		>
			{renderContent()}
		</View>
	);
};

export default React.memo(EventForm);
