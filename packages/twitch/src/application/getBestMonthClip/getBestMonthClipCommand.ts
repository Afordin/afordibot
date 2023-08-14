import { GetBestMonthClipCommandConstructor } from 'application/types/getBestMonthClip'

export class GetBestMonthClipCommand {
	public readonly channelName: string

	constructor({ channelName }: GetBestMonthClipCommandConstructor) {
		this.channelName = channelName
	}
}
