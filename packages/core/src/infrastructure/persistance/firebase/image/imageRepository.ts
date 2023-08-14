import { BaseRepository } from '../common/baseRepository'
import { Image } from 'domain/image/Image'
import type { Dependencies } from 'types/container'
import type { ImagesDocument } from 'infrastructure/types/imageRepository'

export class ImageRepository extends BaseRepository {
	private _imageDocumentParser: Dependencies['imageDocumentParser']

	constructor({
		config,
		dbHandler,
		httpClient,
		imageDocumentParser,
	}: Pick<Dependencies, 'config' | 'dbHandler' | 'httpClient' | 'imageDocumentParser'>) {
		super({ config, dbHandler, httpClient })
		this._imageDocumentParser = imageDocumentParser
	}

	private _parseImages(images: Image[]) {
		const imagesDocument: ImagesDocument = {}
		images.forEach((image) => {
			const imageDocument = this._imageDocumentParser.toDocument(image)
			imagesDocument[imageDocument.username] = imageDocument
		})
		return imagesDocument
	}

	public async saveMany(images: Image[]) {
		try {
			const imagesDocument = this._parseImages(images)
			await this._save<ImagesDocument>('images', imagesDocument)
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
