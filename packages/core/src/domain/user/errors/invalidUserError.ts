export class InvalidUserError extends Error {
	constructor(message: string) {
		super()
		this.message = message
	}
}

export enum InvalidUserMessages {
	INVALID_USERNAME = 'Property "username" is required and must be a string with at least 4 characters and a maximum of 25',
	INVALID_JOLINES = 'Property "jolines" is required and must be a positive integer number equal or greater than 0',
	INVALID_AFLORES = 'Property "aflores" is required, must be an object and must have a "total" property as a positive integer number equal or greater than 0',
}
