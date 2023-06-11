import { CronJob, CronCommand } from 'cron'
import { CronTime } from 'infrastructure/types/cron'

export class CronService {
	private _ON_COMPLETE = null
	private _START_NOW = true
	private _WEEKLY = '0 0 * * 1'
	private _MONTHLY = '0 0 1 * *'

	private _cronJob(command: CronTime, onTick: CronCommand) {
		return new CronJob(command, onTick, this._ON_COMPLETE, this._START_NOW)
	}
	public weekly(onTick: CronCommand) {
		return this._cronJob(this._WEEKLY, onTick)
	}

	public monthly(onTick: CronCommand) {
		return this._cronJob(this._MONTHLY, onTick)
	}
}
