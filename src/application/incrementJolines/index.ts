import { Dependencies } from 'types/container'
import { IncrementJolinesCommand } from './incrementJolinesCommand'

export class IncrementJolines {
	private _userRepository: Dependencies['userRepository']
	private _userGenerator: Dependencies['userGenerator']

	constructor({ userRepository, userGenerator }: Pick<Dependencies, 'userRepository' | 'userGenerator'>) {
		this._userRepository = userRepository
		this._userGenerator = userGenerator
	}

	public async execute({ username, channelName }: IncrementJolinesCommand) {
		// Get instances of the domain objects
		const user = await this._userRepository.findByUsername({ username, collection: 'users' })
		const weeklyUser = await this._userRepository.findByUsername({ username, collection: 'weekly' })
		const monthlyUser = await this._userRepository.findByUsername({ username, collection: 'monthly' })
		const channel = await this._userRepository.findByUsername({ username: channelName, collection: 'channels' })
		const channelUser = await this._userRepository.findByUsernameAndChannel({ username, channel: channelName })

		// Create the domain objects if they don't exist
		const userDomain = this._userGenerator.generateIfNotExists({ user, username })
		const weeklyUserDomain = this._userGenerator.generateIfNotExists({ user: weeklyUser, username })
		const monthlyUserDomain = this._userGenerator.generateIfNotExists({ user: monthlyUser, username })
		const channelDomain = this._userGenerator.generateIfNotExists({ user: channel, username: channelName })
		const channelUserDomain = this._userGenerator.generateIfNotExists({ user: channelUser, username })

		// Increment jolines
		userDomain.incrementJolines()
		weeklyUserDomain.incrementJolines()
		monthlyUserDomain.incrementJolines()
		channelDomain.incrementJolines()
		channelUserDomain.incrementJolines()

		// Save the changes
		await this._userRepository.saveByUsername({ user: userDomain, collection: 'users' })
		await this._userRepository.saveByUsername({ user: weeklyUserDomain, collection: 'weekly' })
		await this._userRepository.saveByUsername({ user: monthlyUserDomain, collection: 'monthly' })
		await this._userRepository.saveByUsername({ user: channelDomain, collection: 'channels' })
		await this._userRepository.saveByUsernameAndChannel({ user: channelUserDomain, channel: channelName })
	}
}
