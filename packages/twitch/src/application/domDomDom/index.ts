import { DomDomDomResponse } from './domDomDomResponse'
import { Dependencies } from 'types/container'

export class DomDomDom {
	private _utils: Dependencies['utils']
	private URL = 'https://clips.twitch.tv/MildAmericanPoultryRickroll-7_xgrKSC3TNGOmu6'
	private MESSAGES = ['Fragment Fragment!', 'Coding like a pro!', 'Virtual dom, dom, dom!', 'Soy un npc?']

	constructor({ utils }: Pick<Dependencies, 'utils'>) {
		this._utils = utils
	}

	public excecute() {
		const message = this._utils.getRandomItem(this.MESSAGES)
		return new DomDomDomResponse({ message, url: this.URL })
	}
}
