import { DocumentParser } from 'infrastructure/types/firebase'
import { ImageEntity } from 'domain/types/Image'
import { Image } from 'domain/image/Image'

export type ImageDocumentParser = DocumentParser<ImageEntity, Image>

export interface ImagesDocument {
	[key: string]: ImageEntity
}
