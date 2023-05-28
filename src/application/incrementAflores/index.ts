import { IncrementAfloresCommand } from './incrementAfloresCommand'
import { IncrementAfloresResponse } from './incrementAfloresResponse'
import type { Dependencies } from 'types/container'

export class IncrementAflores {
	private _userRepository: Dependencies['userRepository']
	private _userGenerator: Dependencies['userGenerator']
	private _emojiService: Dependencies['emojiService']

	constructor({
		userRepository,
		userGenerator,
		emojiService,
	}: Pick<Dependencies, 'userRepository' | 'userGenerator' | 'emojiService'>) {
		this._userRepository = userRepository
		this._userGenerator = userGenerator
		this._emojiService = emojiService
	}

	public async execute({ gifterName, receiverName, channelName }: IncrementAfloresCommand) {
		// Get instances of the domain objects
		const aflor = this._emojiService.getRandomAflor()
		const user = await this._userRepository.findByUsername({ username: receiverName, collection: 'users' })
		const channel = await this._userRepository.findByUsername({ username: channelName, collection: 'channels' })
		const channelUser = await this._userRepository.findByUsernameAndChannel({
			username: receiverName,
			channel: channelName,
		})

		// Create the domain objects if they don't exist
		const userDomain = this._userGenerator.generateIfNotExists({ user, username: receiverName })
		const channelDomain = this._userGenerator.generateIfNotExists({ user: channel, username: channelName })
		const channelUserDomain = this._userGenerator.generateIfNotExists({ user: channelUser, username: receiverName })

		// Increment aflores
		userDomain.incrementAflores(aflor)
		channelDomain.incrementAflores(aflor)
		channelUserDomain.incrementAflores(aflor)

		// Save the changes
		await this._userRepository.saveByUsername({ user: userDomain, collection: 'users' })
		await this._userRepository.saveByUsername({ user: channelDomain, collection: 'channels' })
		await this._userRepository.saveByUsernameAndChannel({ user: channelUserDomain, channel: channelName })

		// Return the response
		return new IncrementAfloresResponse({ gifterName, receiverName, aflor })
	}
}
