import type { InteractorResponse } from 'application/types/interactorResponse'
import type { GetBestMonthClipResponseConstructor } from 'application/types/getBestMonthClip'

export class GetBestMonthClipResponse implements InteractorResponse {
	private _url?: string

	constructor({ url }: GetBestMonthClipResponseConstructor) {
		this._url = url
	}

	public getMessage() {
		// TODO - Add afor's channel emote
		if (!this._url) return 'No hay clips en el último mes :c'
		return `Aquí tienes clip más visto del mes -> ${this._url}`
	}
}
