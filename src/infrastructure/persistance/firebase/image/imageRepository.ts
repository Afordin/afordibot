import { Dependencies } from 'types/container'
import { BaseRepository } from '../common/baseRepository'
import { ImagesDocument } from 'infrastructure/types/imageRepository'
import { Image } from 'src/domain/image/Image'

export class ImageRepository extends BaseRepository {
	private _imageDocumentParser: Dependencies['imageDocumentParser']

	constructor({
		dbHandler,
		httpClient,
		imageDocumentParser,
	}: Pick<Dependencies, 'dbHandler' | 'httpClient' | 'imageDocumentParser'>) {
		super({ dbHandler, httpClient })
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
