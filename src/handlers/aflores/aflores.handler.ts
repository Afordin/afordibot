import { Database, get, increment, ref, update } from 'firebase/database'
import { MessagesHandlers } from 'handlers/messages'
import { ChatUserstate } from 'tmi.js'
import { getRandomFlower } from 'utils/getRandomEmoji'
import { RegExpModule } from 'utils/regExp'
import { Bot } from 'config/Bot'
import { BotServices } from 'services/bot.service'
import { AfloresTypes } from 'types/Aflores.types'

export module AfloresHandler {
	export const incrementUserFlowers = async (
		accessToken: string,
		database: Database,
		channel: string,
		username: string,
		aflor: AfloresTypes.Aflor,
	) => {
		try {
			const userKey = username.toLowerCase()
			const userRef = ref(database, `users/${userKey}/aflores`)
			const channelRef = ref(database, `channels/${channel}/aflores`)
			const monthlyRef = ref(database, `monthly/${userKey}/aflores`)
			const weeklyRef = ref(database, `weekly/${userKey}/aflores`)
			const channelUsersRef = ref(database, `channels-users/${channel}/${userKey}/aflores`)

			const weeklyExists = (await get(weeklyRef)).exists()
			if (!weeklyExists) await BotServices.updateUserImage(database, accessToken, userKey, channel)

			await update(userRef, { [aflor]: increment(1), total: increment(1) })
			await update(channelRef, { [aflor]: increment(1), total: increment(1) })
			await update(monthlyRef, { [aflor]: increment(1), total: increment(1) })
			await update(weeklyRef, { [aflor]: increment(1), total: increment(1) })
			await update(channelUsersRef, { [aflor]: increment(1), total: increment(1) })
		} catch (error) {
			throw error
		}
	}

	export const getAflores = async (database: Database, channel: string, username?: string) => {
		try {
			if (username) {
				const afloresRef = ref(database, `channels-users/${channel}/${username}/aflores/total`)
				const afloresSnapshot = await get(afloresRef)
				return afloresSnapshot.val()
			}
			const afloresRef = ref(database, `channels/${channel}/aflores/total`)
			const afloresSnapshot = await get(afloresRef)
			return afloresSnapshot.val()
		} catch (error) {
			throw error
		}
	}

	export const onAflorUser =
		(bot: Bot, database: Database) => async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				const cleanedMessage = message.trim().toLowerCase()
				const isAflorUser = RegExpModule.alforUser.test(cleanedMessage)
				if (self || !isAflorUser) return

				const cleanedChannel = channel.replace('#', '')
				const username = MessagesHandlers.getUsername(cleanedMessage)
				const aflor = getRandomFlower()
				await incrementUserFlowers(bot.tokenResponse.access_token, database, cleanedChannel, username, aflor)
				bot.client.say(channel, MessagesHandlers.userAflor(aflor, ctx.username!, username))
			} catch (error) {
				throw error
			}
		}

	export const onAfloresCommand =
		(bot: Bot, database: Database) => async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				const cleanedMessage = message.trim().toLowerCase()
				const isNotAflores = cleanedMessage !== '!aflores'
				if (self || isNotAflores) return

				const cleanedChannel = channel.replace('#', '')
				const aflores = await getAflores(database, cleanedChannel)
				bot.client.say(channel, MessagesHandlers.totalAflores(aflores))
			} catch (error) {
				throw error
			}
		}
}
