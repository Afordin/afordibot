export class InvalidOptionError extends Error {
	constructor(message: string) {
		super()
		this.message = message
	}
}

export enum InvalidOptionMessages {
	// Name
	INVALID_NAME = 'Property "name" is required and must be a string',
	TOO_SHORT_NAME = 'Property "name" must have at least 4 characters',
	TOO_LONG_NAME = 'Property "name" must have at most 10 characters',

	// Description
	INVALID_DESCRIPTION = 'Property "description" must be a string or undefined',
	TOO_SHORT_DESCRIPTION = 'Property "description" must have at least 10 characters when it is provided',
}
