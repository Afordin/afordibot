import axios from 'axios'
import { BotTypes } from 'types/Bot.types'

export module Bot {
	export const BOT_ID: string = process.env.BOT_ID!
	export const BOT_SECRET: string = process.env.BOT_SECRET!
	export const BOT_CODE: string = process.env.BOT_CODE!
	export const BOT_USERNAME: string = process.env.BOT_USERNAME!
	export const BOT_CHANNELS: string[] = process.env.BOT_CHANNELS!.split(' ')
	export const TOKEN_ENDPOINT: string = process.env.TOKEN_ENDPOINT!
	export const GRANT_TYPE: string = 'authorization_code'
	export const REDIRECT_URI: string = 'http://localhost'

	export const getAccessToken = async (): Promise<BotTypes.TokenResponse> => {
		try {
			const { data } = await axios<BotTypes.TokenResponse>({
				method: 'POST',
				url: TOKEN_ENDPOINT,
				params: {
					client_id: BOT_ID,
					client_secret: BOT_SECRET,
					code: BOT_CODE,
					grant_type: GRANT_TYPE,
					redirect_uri: REDIRECT_URI,
				},
			})
			return data
		} catch (error) {
			throw error
		}
	}

	export const createBotOptions = async () => {
		const { access_token } = await getAccessToken()
		return {
			identity: {
				username: BOT_USERNAME,
				password: `oauth:${access_token}`,
			},
			channels: BOT_CHANNELS,
		}
	}
}
