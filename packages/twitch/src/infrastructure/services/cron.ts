import { CronCommand } from 'cron'
import { CronTime } from 'infrastructure/types/cron'
import { Dependencies } from 'types/container'

export class CronService {
	private _CronJob: Dependencies['CronJob']
	private _ON_COMPLETE = null
	private _START_NOW = true
	private _WEEKLY = '0 0 * * 1'
	private _MONTHLY = '0 0 1 * *'

	constructor({ CronJob }: Pick<Dependencies, 'CronJob'>) {
		this._CronJob = CronJob
	}

	private _cronJob(command: CronTime, onTick: CronCommand) {
		return new this._CronJob(command, onTick, this._ON_COMPLETE, this._START_NOW)
	}
	public weekly(onTick: CronCommand) {
		return this._cronJob(this._WEEKLY, onTick)
	}

	public monthly(onTick: CronCommand) {
		return this._cronJob(this._MONTHLY, onTick)
	}
}
