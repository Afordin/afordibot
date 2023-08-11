import { AfordiBot } from '@afordibot/core'
import { config } from 'infrastructure/config'

import type { Dependencies } from 'types/container'
import type { BotCommand, JolinCommand, JolinesCommand, AflorCommand } from 'infrastructure/types/bot'

export class TwitchBot {
	private _afordibot: AfordiBot
	private _client: ReturnType<Dependencies['TmiClient']>
	private _commandService: Dependencies['commandService']
	private _textParserService: Dependencies['textParserService']

	constructor({
		afordibot,
		TmiClient,
		commandService,
		textParserService,
	}: Pick<Dependencies, 'afordibot' | 'TmiClient' | 'commandService' | 'textParserService'>) {
		this._afordibot = afordibot
		this._client = new TmiClient(config.botConfig)
		this._commandService = commandService
		this._textParserService = textParserService
	}

	private async _isJolin(command: JolinCommand) {
		await this._afordibot.incrementJolines(command)
	}

	private async _isChannelJolines({ channelName }: BotCommand) {
		const response = await this._afordibot.getChannelJolines({ channelName })
		this._client.say(`#${channelName}`, response.message)
	}

	private async _isChannelAflores({ channelName }: BotCommand) {
		const response = await this._afordibot.getChannelAflores({ channelName })
		this._client.say(`#${channelName}`, response.message)
	}

	private async _isUserJolines({ channelName, message }: JolinesCommand) {
		const username = this._textParserService.parseUsername(message)
		const response = await this._afordibot.getUserJolines({ username, channelName })
		this._client.say(`#${channelName}`, response.message)
	}

	private async _isUserAflor({ username, channelName, message }: AflorCommand) {
		const receiverName = this._textParserService.parseUsername(message)
		const response = await this._afordibot.incrementAflores({ gifterName: username, receiverName, channelName })
		this._client.say(`#${channelName}`, response.message)
	}

	private _onConnected() {
		this._client.on('connected', () => {
			console.log('[+] Bot connected')
		})
	}

	private _onMessage() {
		this._client.on('message', async (channel, ctx, dirtyMessage, self) => {
			try {
				if (self) return
				const username = ctx.username!
				const channelName = this._textParserService.cleanChannel(channel)
				const message = this._textParserService.cleanMessage(dirtyMessage)

				if (this._commandService.isJolin(message)) await this._isJolin({ username, channelName })
				else if (this._commandService.isChannelJolines(message)) await this._isChannelJolines({ channelName })
				else if (this._commandService.isChannelAflores(message)) await this._isChannelAflores({ channelName })
				else if (this._commandService.isUserJolines(message)) await this._isUserJolines({ channelName, message })
				else if (this._commandService.isUserAflor(message)) await this._isUserAflor({ username, channelName, message })
			} catch (error) {
				console.error(error)
			}
		})
	}

	public connect() {
		this._onConnected()
		this._onMessage()
		this._client.connect()
	}
}
