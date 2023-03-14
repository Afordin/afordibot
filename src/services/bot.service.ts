import axios from 'axios'
import { Database, ref, update } from 'firebase/database'
import { BotTypes } from 'types/Bot.types'

export module BotService {
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
			console.log('BotService:getTokenResponse -->', error)
			throw error
		}
	}

	export const getUserData = async (accessToken: string, username: string) => {
		try {
			const { data } = await axios<BotTypes.UserData>({
				method: 'GET',
				url: `${process.env.USER_DATA_ENDPOINT!}?login=${username}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Client-ID': process.env.BOT_ID!,
				},
			})
			if (data.data.length === 0) throw new Error('User not found')
			return data.data[0] as BotTypes.UserDataResponse
		} catch (error) {
			console.log('BotService:getUserData -->', error)
			throw error
		}
	}

	export const updateUserImage = async (database: Database, accessToken: string, userKey: string, channel: string) => {
		try {
			const { profile_image_url: imageUrl } = await BotService.getUserData(accessToken, userKey)
			await update(ref(database, `users/${userKey}`), { imageUrl })
			await update(ref(database, `weekly/${userKey}`), { imageUrl })
			await update(ref(database, `monthly/${userKey}`), { imageUrl })
			await update(ref(database, `channels-users/${channel}/${userKey}`), { imageUrl })
		} catch (error) {
			console.log('BotService:updateUserImage -->', error)
			throw error
		}
	}

	export const updateChannelImage = async (database: Database, accessToken: string, channel: string) => {
		try {
			const { profile_image_url: imageUrl } = await BotService.getUserData(accessToken, channel)
			await update(ref(database, `channels/${channel}`), { imageUrl })
		} catch (error) {
			console.log('BotService:updateChannelImage -->', error)
			throw error
		}
	}
}
