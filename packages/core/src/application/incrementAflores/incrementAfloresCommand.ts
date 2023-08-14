import type { IncrementAfloresCommandConstructor } from 'application/types/incrementAflores'

export class IncrementAfloresCommand {
	public gifterName: string
	public receiverName: string
	public channelName: string

	constructor({ gifterName, receiverName, channelName }: IncrementAfloresCommandConstructor) {
		this.gifterName = gifterName
		this.receiverName = receiverName
		this.channelName = channelName
	}
}
