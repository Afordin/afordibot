import { GetUserJolinesCommandConstructor } from 'application/types/getUserJolines'

export class GetUserJolinesCommand {
	public username: string
	public channelName: string

	constructor({ channelName, username }: GetUserJolinesCommandConstructor) {
		this.username = username
		this.channelName = channelName
	}
}
