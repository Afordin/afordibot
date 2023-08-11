import { Timeout, TimeoutMap } from 'infrastructure/types/timeout'

export class TimeoutService {
	private TIMEOUT_DURATION = 120 * 1000
	private _channels = new Map<string, TimeoutMap>()

	public addTimeout({ channelName, command }: Timeout) {
		const timeouts = this._channels.get(channelName) ?? {}
		this._channels.set(channelName, { ...timeouts, [command]: true })

		setTimeout(() => {
			this.removeTimeout({ channelName, command })
		}, this.TIMEOUT_DURATION)
	}

	public removeTimeout({ channelName, command }: Timeout) {
		const timeouts = this._channels.get(channelName) ?? {}
		this._channels.set(channelName, { ...timeouts, [command]: false })
	}

	public isTimeout({ channelName, command }: Timeout) {
		const timeouts = this._channels.get(channelName) ?? {}
		return timeouts[command] ?? false
	}
}
