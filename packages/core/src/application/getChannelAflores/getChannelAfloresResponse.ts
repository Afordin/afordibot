import type { InteractorResponse } from 'application/types/interactorResponse'
import type { GetChannelAfloresResponseConstructor } from 'application/types/getChannelAflores'
import type { Aflor } from 'domain/types/Emoji'

export class GetChannelAfloresResponse implements InteractorResponse {
	public _aflores: number
	public _aflor: Aflor

	constructor({ aflores, aflor }: GetChannelAfloresResponseConstructor) {
		this._aflores = aflores
		this._aflor = aflor
	}

	public getMessage() {
		if (this._aflores === 0) return 'No tenemos aflores :c'
		else if (this._aflores === 1) return `Llevamos una aflor ${this._aflor}!`
		return `Llevamos ${this._aflores} aflores ${this._aflor}!`
	}

	public getAflores() {
		return this._aflores
	}

	public getAflor() {
		return this._aflor
	}
}
