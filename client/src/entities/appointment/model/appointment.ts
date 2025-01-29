export interface Appointment {
	id: string
	date: Date | string
	weekDay?: number
	timeId?: string
	customerId?: string
	eventId: string
	durationId?: string
	isFromSchedule?: boolean
}
