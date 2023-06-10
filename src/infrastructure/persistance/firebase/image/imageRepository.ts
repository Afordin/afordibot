import { Dependencies } from 'types/container'
import { BaseRepository } from '../common/baseRepository'
import { ImagesDocument } from 'infrastructure/types/imageRepository'
import { ImageEntity } from 'domain/types/Image'
import { Image } from 'src/domain/image/Image'

export class ImageRepository extends BaseRepository {
	private _dateService: Dependencies['dateService']
	private _imageDocumentParser: Dependencies['imageDocumentParser']

	constructor({
		dbHandler,
		dateService,
		imageDocumentParser,
	}: Pick<Dependencies, 'dbHandler' | 'dateService' | 'imageDocumentParser'>) {
		super({ dbHandler })
		this._dateService = dateService
		this._imageDocumentParser = imageDocumentParser
	}

	private _filterOutdated(images: Image[], image: ImageEntity) {
		const isOutDated = this._dateService.isWeeklyOutdated(image.updatedAt)
		if (isOutDated) images.push(this._imageDocumentParser.toDomain(image))
		return images
	}

	public async findOutdated() {
		try {
			const document = await this._find<ImagesDocument>('images')
			if (!document) return []
			const images: ImageEntity[] = Object.values(document)
			const outdatedImages = images.reduce<Image[]>(this._filterOutdated, [])
			return outdatedImages
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
