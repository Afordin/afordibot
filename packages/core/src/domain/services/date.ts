import { Dependencies } from 'types/container'

export class DateService {
	private FORMAT = 'DDMMYYYY'
	private _dayjs: Dependencies['dayjs']

	constructor({ dayjs }: Pick<Dependencies, 'dayjs'>) {
		this._dayjs = dayjs
	}

	public now() {
		return this._dayjs().format(this.FORMAT)
	}
}
