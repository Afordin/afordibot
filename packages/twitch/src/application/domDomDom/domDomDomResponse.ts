import { InteractorResponse } from 'application/types/interactorResponse'

export class DomDomDomResponse implements InteractorResponse {
	private readonly FIRST = 'Fragment Fragment!'
	private readonly SECOND = 'Coding like a pro!'
	private readonly THIRD = 'Virtual dom, dom, dom!'
	private readonly _choice: string

	constructor(posibility: number) {
		if (posibility < 0.3) this._choice = this.FIRST
		else if (posibility < 0.6) this._choice = this.SECOND
		else this._choice = this.THIRD
	}

	public getMessage() {
		return `${this._choice} -> ${process.env.DOM_DOM_DOM}`
	}
}
