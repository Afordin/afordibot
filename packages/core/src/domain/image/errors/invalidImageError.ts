export class InvalidImageError extends Error {
	constructor(message: string) {
		super()
		this.message = message
	}
}

export enum InvalidImageMessages {
	INVALID_USERNAME = 'Property "username" is required and must be a string with at least 4 characters',
	INVALID_IMAGE_URL = 'Property "imageUrl" is required and must be a string',
	INVALID_UPDATED_AT = 'Property "updatedAt" is required and must be a string with the format "DDMMYYYY"',
}
