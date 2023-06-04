import { ImageDocumentParser } from 'infrastructure/types/imageRepository'
import { Image } from 'domain/image/Image'

export const imageDocumentParser = (): ImageDocumentParser => {
	return {
		toDomain: ({ username, imageUrl, updatedAt }) => {
			return new Image({
				username,
				imageUrl,
				updatedAt,
			})
		},
		toDocument: ({ username, imageUrl, updatedAt }) => {
			return {
				username,
				imageUrl,
				updatedAt,
			}
		},
	}
}
