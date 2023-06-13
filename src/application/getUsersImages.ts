import { Dependencies } from 'types/container'
import { Image } from 'domain/image/Image'
import { HelixUserData } from 'infrastructure/types/restHelixClient'

export class GetUsersImages {
	private _userRepository: Dependencies['userRepository']
	private _imageRepository: Dependencies['imageRepository']
	private _restHelixClient: Dependencies['restHelixClient']
	private _dateService: Dependencies['dateService']

	constructor({
		userRepository,
		imageRepository,
		restHelixClient,
		dateService,
	}: Pick<Dependencies, 'userRepository' | 'imageRepository' | 'restHelixClient' | 'dateService'>) {
		this._userRepository = userRepository
		this._imageRepository = imageRepository
		this._restHelixClient = restHelixClient
		this._dateService = dateService
	}

	private _generateImage(userData: HelixUserData, currentDate: string) {
		return new Image({
			username: userData.login,
			imageUrl: userData.profile_image_url,
			updatedAt: currentDate,
		})
	}

	public async execute() {
		const currentDate = this._dateService.now()
		const users = await this._userRepository.findKeys('users')
		const usersData = await this._restHelixClient.getUsersData(users)
		const images = usersData.map((user) => this._generateImage(user, currentDate))
		await this._imageRepository.saveMany(images)
	}
}
