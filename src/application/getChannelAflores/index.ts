import { GetChannelAfloresCommand } from './getChannelAfloresCommand'
import { GetChannelAfloresResponse } from './getChannelAfloresResponse'
import { Dependencies } from 'types/container'

export class GetChannelAflores {
	private _userRepository: Dependencies['userRepository']
	private _emojiService: Dependencies['emojiService']

	constructor({ userRepository, emojiService }: Pick<Dependencies, 'userRepository' | 'emojiService'>) {
		this._userRepository = userRepository
		this._emojiService = emojiService
	}

	public async execute({ channelName }: GetChannelAfloresCommand) {
		const aflor = this._emojiService.getRandomAflor()
		const channel = await this._userRepository.findByUsername({ username: channelName, collection: 'channels' })
		const aflores = channel?.aflores.total ?? 0
		return new GetChannelAfloresResponse({ aflores, aflor })
	}
}
