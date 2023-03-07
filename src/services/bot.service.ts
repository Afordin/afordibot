import axios from 'axios'
import { BotTypes } from 'types/Bot.types'

export module BotServices {
	export const getTokenResponse = async () => {
		try {
			const { data } = await axios<BotTypes.TokenResponse>({
				method: 'POST',
				url: process.env.TOKEN_ENDPOINT!,
				params: {
					client_id: process.env.BOT_ID!,
					client_secret: process.env.BOT_SECRET!,
					code: process.env.BOT_CODE!,
					grant_type: 'authorization_code',
					redirect_uri: 'http://localhost',
				},
			})
			return data
		} catch (error) {
			throw error
		}
	}
}
