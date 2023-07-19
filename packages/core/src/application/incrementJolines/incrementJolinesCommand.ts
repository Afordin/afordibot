import type { IncrementJolinesCommandConstructor } from 'application/types/incrementJolines'

export class IncrementJolinesCommand {
	public username: string
	public channelName: string

	constructor({ username, channelName }: IncrementJolinesCommandConstructor) {
		this.username = username
		this.channelName = channelName
	}
}
