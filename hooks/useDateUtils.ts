export const useDateUtils = () => {
	const isDateInPast = (dateString: string): boolean => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const checkDate = new Date(dateString);
		checkDate.setHours(0, 0, 0, 0);

		return checkDate < today;
	};

	return { isDateInPast };
};
