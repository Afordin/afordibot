import type { GetChannelAfloresCommandConstructor } from 'application/types/getChannelAflores'

export class GetChannelAfloresCommand {
	public channelName: string

	constructor({ channelName }: GetChannelAfloresCommandConstructor) {
		this.channelName = channelName
	}
}
