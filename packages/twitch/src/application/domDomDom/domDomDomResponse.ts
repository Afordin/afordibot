import { InteractorResponse } from 'application/types/interactorResponse'
import { DomDomDomResponseConstructor } from 'application/types/domDomDom'

export class DomDomDomResponse implements InteractorResponse {
	private _message: string
	private _url: string

	constructor({ message, url }: DomDomDomResponseConstructor) {
		this._message = message
		this._url = url
	}

	public getMessage() {
		return `${this._message} -> ${this._url}`
	}
}
