import type { Dayjs } from 'dayjs'
import type { Dependencies } from 'types/container'

export class DateBuilder {
	private DEFAULT_FORMAT = 'DDMMYYYY'
	private _dayjs: Dependencies['dayjs']
	private _date: Dayjs

	constructor({ dayjs }: Pick<Dependencies, 'dayjs'>) {
		this._dayjs = dayjs
		this._date = this._dayjs()
	}

	public now() {
		this._date = this._dayjs()
		return this
	}

	public lastMonth() {
		this._date = this._dayjs().subtract(1, 'month')
		return this
	}

	public format(format: string = this.DEFAULT_FORMAT) {
		const formatted = this._date.format(format)
		this.now()
		return formatted
	}

	public toISOString() {
		const formatted = this._date.toISOString()
		this.now()
		return formatted
	}
}
