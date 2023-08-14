export class TextParserService {
	public cleanChannel(channel: string): string {
		return channel.replace('#', '')
	}

	public cleanMessage(message: string): string {
		return message.trim().toLowerCase()
	}

	public parseCommandName(message: string): string {
		return message.split(' ')[0].replace('!', '')
	}

	public parseUsername(message: string): string {
		return message.split(' ')[1].replace('@', '')
	}
}
