import { Image } from 'domain/image/Image'
import type { ImageEntity } from 'domain/types/Image'
import type { DocumentParser } from 'infrastructure/types/firebase'

export type ImageDocumentParser = DocumentParser<ImageEntity, Image>

export interface ImagesDocument {
	[key: string]: ImageEntity
}
