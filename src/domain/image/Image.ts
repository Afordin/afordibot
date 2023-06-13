import { InvalidImageError, InvalidImageMessages } from './errors/invalidImageError'
import { ImageEntity } from 'domain/types/Image'

export class Image implements ImageEntity {
	private _username: string
	private _imageUrl: string
	private _updatedAt: string

	constructor({ username, imageUrl, updatedAt }: ImageEntity) {
		this._assertUsername(username)
		this._assertImageUrl(imageUrl)
		this._assertUpdatedAt(updatedAt)
		this._username = username
		this._imageUrl = imageUrl
		this._updatedAt = updatedAt
	}

	get username(): string {
		return this._username
	}

	get imageUrl(): string {
		return this._imageUrl
	}

	get updatedAt(): string {
		return this._updatedAt
	}

	private _assertUsername(username: string) {
		if (typeof username !== 'string' || username.length < 4) {
			throw new InvalidImageError(InvalidImageMessages.INVALID_USERNAME)
		}
	}

	private _assertImageUrl(imageUrl: string) {
		if (typeof imageUrl !== 'string') {
			throw new InvalidImageError(InvalidImageMessages.INVALID_IMAGE_URL)
		}
	}

	private _assertUpdatedAt(updatedAt: string) {
		if (typeof updatedAt !== 'string' || updatedAt.length !== 8) {
			throw new InvalidImageError(InvalidImageMessages.INVALID_UPDATED_AT)
		}
	}
}
