import { Image } from 'domain/image/Image'
import type { ImageDocumentParser } from 'infrastructure/types/imageRepository'

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
