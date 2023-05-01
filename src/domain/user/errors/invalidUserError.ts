export class InvalidUserError extends Error {
	constructor(message: string) {
		super(message)
	}
}

export const INVALID_USERNAME = 'Property "username" is required and must be a string with at least 4 characters'
export const INVALID_JOLINES =
	'Property "jolines" is required and must be a positive integer number equal or greater than 0'
export const INVALID_AFLORES =
	'Property "aflores" is required, must be an object and must have a "total" property as a positive integer number equal or greater than 0'
