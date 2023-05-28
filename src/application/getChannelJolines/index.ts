import { GetChannelJolinesCommand } from './getChannelJolinesCommand'
import { GetChannelJolinesResponse } from './getChannelJolinesResponse'
import { Dependencies } from 'types/container'

export class GetChannelJolines {
	private _userRepository: Dependencies['userRepository']
	private _emojiService: Dependencies['emojiService']

	constructor({ userRepository, emojiService }: Pick<Dependencies, 'userRepository' | 'emojiService'>) {
		this._userRepository = userRepository
		this._emojiService = emojiService
	}

	public async execute({ channelName }: GetChannelJolinesCommand) {
		const pig = this._emojiService.getRandomPig()
		const channel = await this._userRepository.findByUsername({ username: channelName, collection: 'channels' })
		const jolines = channel?.jolines ?? 0
		return new GetChannelJolinesResponse({ jolines, pig })
	}
}
