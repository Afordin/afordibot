export class CommandService {
	private userJolines = /^!jolines @?[a-zA-Z0-9_]{4,25}(?:\s+.*)?$/
	private userAflor = /^!(aflor|flor) @?[a-zA-Z0-9_]{4,25}(?:\s+.*)?$/

	private channelJolines = /^!jolines$/
	private channelAflores = /^!(aflores|flores)$/

	private domDomDom = /^!domdomdom(?:\s+.*)?$/
	private clip = /^!clip(?:\s+.*)?$/

	public isJolin(message: string) {
		return message.includes('jolin') && !message.includes('jolines')
	}

	public isUserJolines(message: string) {
		return this.userJolines.test(message)
	}

	public isUserAflor(message: string) {
		return this.userAflor.test(message)
	}

	public isChannelJolines(message: string) {
		return this.channelJolines.test(message)
	}

	public isChannelAflores(message: string) {
		return this.channelAflores.test(message)
	}

	public isDomDomDom(message: string) {
		return this.domDomDom.test(message)
	}

	public isClip(message: string) {
		return this.clip.test(message)
	}
}
