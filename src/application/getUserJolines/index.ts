import { GetUserJolinesCommand } from './getUserJolinesCommand'
import { GetUserJolinesResponse } from './getUserJolinesResponse'
import { Dependencies } from 'types/container'

export class GetUserJolines {
	private _userRepository: Dependencies['userRepository']
	private _emojiService: Dependencies['emojiService']

	constructor({ userRepository, emojiService }: Pick<Dependencies, 'userRepository' | 'emojiService'>) {
		this._userRepository = userRepository
		this._emojiService = emojiService
	}

	public async execute({ username, channelName }: GetUserJolinesCommand) {
		const pig = this._emojiService.getRandomPig()
		const user = await this._userRepository.findByUsernameAndChannel({ username, channelName })
		const jolines = user?.jolines ?? 0
		return new GetUserJolinesResponse({ username, jolines, pig })
	}
}
