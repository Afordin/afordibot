import type { InteractorResponse } from 'application/types/interactorResponse'
import type { GetChannelJolinesResponseConstructor } from 'application/types/getChannelJolines'
import type { Pig } from 'domain/types/Emoji'

export class GetChannelJolinesResponse implements InteractorResponse {
	private _jolines: number
	private _pig: Pig

	constructor({ jolines, pig }: GetChannelJolinesResponseConstructor) {
		this._jolines = jolines
		this._pig = pig
	}

	public getMessage() {
		if (!this._jolines) return 'No tenemos jolines :c'
		else if (this._jolines === 1) return `Llevamos ${this._jolines} jolín ${this._pig}!`
		return `Llevamos ${this._jolines} jolines ${this._pig}!`
	}
}
