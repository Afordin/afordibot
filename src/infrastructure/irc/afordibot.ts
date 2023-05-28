import { Client } from 'tmi.js'
import { config } from 'infrastructure/config'
import { container } from 'src/container'

import { GetChannelAfloresCommand } from 'application/getChannelAflores/getChannelAfloresCommand'
import { GetChannelJolinesCommand } from 'application/getChannelJolines/getChannelJolinesCommand'
import { GetUserJolinesCommand } from 'application/getUserJolines/getUserJolinesCommand'
import { IncrementAfloresCommand } from 'application/incrementAflores/incrementAfloresCommand'
import { IncrementJolinesCommand } from 'application/incrementJolines/incrementJolinesCommand'

import type { BotCommand, IsUserJolines, IsUserAflor, IsJolin } from 'infrastructure/types/afordibot'
import type { Dependencies } from 'src/types/container'

export class AfordiBot {
	private _client: Client
	private _textParser: Dependencies['textParser']
	private _commandValidator: Dependencies['commandValidator']

	constructor({ textParser, commandValidator }: Pick<Dependencies, 'textParser' | 'commandValidator'>) {
		this._client = new Client(config.bot)
		this._textParser = textParser
		this._commandValidator = commandValidator
	}

	private async _isJolin({ username, channelName }: IsJolin) {
		const command = new IncrementJolinesCommand({ username, channelName })
		await container.resolve('incrementJolines').execute(command)
	}

	private async _isChannelJolines({ channelName }: BotCommand) {
		const command = new GetChannelJolinesCommand({ channelName })
		const response = await container.resolve('getChannelJolines').execute(command)
		this._client.say(`#${channelName}`, response.getMessage())
	}

	private async _isChannelAflores({ channelName }: BotCommand) {
		const command = new GetChannelAfloresCommand({ channelName })
		const response = await container.resolve('getChannelAflores').execute(command)
		this._client.say(`#${channelName}`, response.getMessage())
	}

	private async _isUserJolines({ channelName, message }: IsUserJolines) {
		const username = this._textParser.parseUsername(message)
		const command = new GetUserJolinesCommand({ username, channelName })
		const response = await container.resolve('getUserJolines').execute(command)
		this._client.say(`#${channelName}`, response.getMessage())
	}

	private async _isUserAflor({ username, channelName, message }: IsUserAflor) {
		const receiverName = this._textParser.parseUsername(message)
		const command = new IncrementAfloresCommand({ gifterName: username, receiverName, channelName })
		const response = await container.resolve('incrementAflores').execute(command)
		this._client.say(`#${channelName}`, response.getMessage())
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
				const channelName = this._textParser.cleanChannel(channel)
				const message = this._textParser.cleanMessage(dirtyMessage)

				if (this._commandValidator.isJolin(message)) await this._isJolin({ username, channelName })
				else if (this._commandValidator.isChannelJolines(message)) await this._isChannelJolines({ channelName })
				else if (this._commandValidator.isChannelAflores(message)) await this._isChannelAflores({ channelName })
				else if (this._commandValidator.isUserJolines(message)) await this._isUserJolines({ channelName, message })
				else if (this._commandValidator.isUserAflor(message))
					await this._isUserAflor({ username, channelName, message })
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
