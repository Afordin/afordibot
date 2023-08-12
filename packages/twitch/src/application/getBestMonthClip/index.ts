import { GetBestMonthClipCommand } from './getBestMonthClipCommand'
import { GetBestMonthClipResponse } from './getBestMonthClipResponse'
import type { HelixClip } from '@afordibot/core'
import type { Dependencies } from 'types/container'

export class GetBestMonthClip {
	private CLIP_LIMIT = 100
	private EXCLUDED_CLIP_IDS = ['MildAmericanPoultryRickroll-7_xgrKSC3TNGOmu6']

	private _afordibot: Dependencies['afordibot']
	private _dateBuilder: Dependencies['dateBuilder']

	constructor({ afordibot, dateBuilder }: Pick<Dependencies, 'afordibot' | 'dateBuilder'>) {
		this._afordibot = afordibot
		this._dateBuilder = dateBuilder
	}

	public async execute({ channelName }: GetBestMonthClipCommand) {
		const broadcasterId = await this._getBroadcasterId(channelName)
		const params = this._createClipParams(broadcasterId)
		const clips = await this._afordibot.getClips(params)
		const bestClip = this._getBestClip(clips)
		return new GetBestMonthClipResponse({ url: bestClip?.url })
	}

	private async _getBroadcasterId(channelName: string) {
		const [{ id }] = await this._afordibot.getUsersData([channelName])
		return id
	}

	private _getMonthDates() {
		const startedAt = this._dateBuilder.lastMonth().toISOString()
		const endedAt = this._dateBuilder.toISOString()
		return { startedAt, endedAt }
	}

	private _createClipParams(broadcaster_id: string) {
		const { startedAt, endedAt } = this._getMonthDates()
		return {
			broadcaster_id,
			started_at: startedAt,
			ended_at: endedAt,
			first: this.CLIP_LIMIT,
		}
	}

	private _getBestClip(clips: HelixClip[]) {
		return clips.reduce((acc, curr) => {
			if (this.EXCLUDED_CLIP_IDS.includes(curr.id)) return acc
			else if (this.EXCLUDED_CLIP_IDS.includes(acc.id)) return curr
			return acc.view_count > curr.view_count ? acc : curr
		})
	}
}
