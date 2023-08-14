import type { Dependencies } from 'types/container'
import type { RankingCollection } from '@afordibot/core'

export class CronJobs {
	private _afordibot: Dependencies['afordibot']
	private _cronService: Dependencies['cronService']

	constructor({ afordibot, cronService }: Pick<Dependencies, 'afordibot' | 'cronService'>) {
		this._afordibot = afordibot
		this._cronService = cronService
	}

	private _updateUsersImages() {
		return async () => {
			try {
				await this._afordibot.updateUsersImages()
			} catch (error) {
				// TODO - add error handling
				console.log(error)
			}
		}
	}

	private _resetRanking(collection: RankingCollection) {
		return async () => {
			try {
				this._afordibot.resetRanking({ collection })
			} catch (error) {
				// TODO - add error handling
				console.log(error)
			}
		}
	}

	private _onStart() {
		console.log('[+] Cron jobs started')
	}

	public start() {
		this._cronService.weekly(this._updateUsersImages())
		this._cronService.weekly(this._resetRanking('weekly'))
		this._cronService.monthly(this._resetRanking('monthly'))
		this._onStart()
	}
}
