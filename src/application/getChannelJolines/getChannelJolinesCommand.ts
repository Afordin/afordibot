import { GetChannelJolinesCommandConstructor } from 'application/types/getChannelJolines'

export class GetChannelJolinesCommand {
	public channelName: string

	constructor({ channelName }: GetChannelJolinesCommandConstructor) {
		this.channelName = channelName
	}
}
