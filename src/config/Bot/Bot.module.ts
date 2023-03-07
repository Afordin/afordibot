import { Client } from 'tmi.js'
import { BotTypes } from 'types/Bot.types'

export class Bot {
	tokenResponse: BotTypes.TokenResponse
	client: Client

	constructor(tokenResponse: BotTypes.TokenResponse) {
		this.tokenResponse = tokenResponse
		this.client = new Client(this.createBotOptions(this.tokenResponse.access_token))
	}

	createBotOptions = (accessToken: string) => {
		return {
			identity: {
				username: process.env.TOKEN_ENDPOINT!,
				password: `oauth:${accessToken}`,
			},
			channels: process.env.BOT_CHANNELS!.split(' '),
		}
	}
}
