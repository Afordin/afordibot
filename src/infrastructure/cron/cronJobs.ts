import { container } from 'src/container'
import { Dependencies } from 'types/container'

import { ResetRankingCommand } from 'application/resetRanking/resetRankingCommand'
import { RankingCollection } from 'application/types/resetRanking'

export class CronJobs {
	private _cronService: Dependencies['cronService']

	constructor({ cronService }: Pick<Dependencies, 'cronService'>) {
		this._cronService = cronService
	}

	private _getUsersImages() {
		return async () => {
			try {
				await container.resolve('getUsersImages').execute()
			} catch (error) {
				// TODO - add error handling
				console.log(error)
			}
		}
	}

	private _resetRanking(collection: RankingCollection) {
		return async () => {
			try {
				const command = new ResetRankingCommand({ collection })
				await container.resolve('resetRanking').execute(command)
			} catch (error) {
				// TODO - add error handling
				console.log(error)
			}
		}
	}

	public start() {
		this._cronService.weekly(this._getUsersImages())
		this._cronService.weekly(this._resetRanking('weekly'))
		this._cronService.monthly(this._resetRanking('monthly'))
	}
}
