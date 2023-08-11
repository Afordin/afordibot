import type { InteractorResponse } from 'application/types/interactorResponse'
import type { IncrementAfloresResponseConstructor } from 'application/types/incrementAflores'
import type { Aflor } from 'domain/types/Emoji'

export class IncrementAfloresResponse implements InteractorResponse {
	private _gifterName: string
	private _receiverName: string
	private _aflor: Aflor

	constructor({ gifterName, receiverName, aflor }: IncrementAfloresResponseConstructor) {
		this._gifterName = gifterName
		this._receiverName = receiverName
		this._aflor = aflor
	}

	public getMessage() {
		return `Toma @${this._receiverName} una aflor ${this._aflor} de @${this._gifterName}!`
	}

	public getAflor() {
		return this._aflor
	}
}
