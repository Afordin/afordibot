export class TextParser {
	public cleanChannel(channel: string): string {
		return channel.replace('#', '')
	}

	public cleanMessage(message: string): string {
		return message.trim().toLowerCase()
	}

	public parseUsername(message: string): string {
		return message.split(' ')[1].replace('@', '')
	}
}
