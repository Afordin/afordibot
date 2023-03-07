import { Database, get, increment, ref, update } from 'firebase/database'
import { MessagesHandlers } from 'handlers/messages'
import { ChatUserstate, Client } from 'tmi.js'
import { RegExpModule } from 'utils/regExp'

export module JolinesHandler {
	export const incrementUserJolines = async (database: Database, channel: string, username: string) => {
		try {
			const userKey = username.toLowerCase()

			const userRef = ref(database, `users/${userKey}`)
			const channelRef = ref(database, `channels/${channel}`)
			const monthlyRef = ref(database, `monthly/${userKey}`)
			const weeklyRef = ref(database, `weekly/${userKey}`)
			const channelUsersRef = ref(database, `channels-users/${channel}/${userKey}`)

			await update(userRef, { jolines: increment(1) })
			await update(channelRef, { jolines: increment(1) })
			await update(monthlyRef, { jolines: increment(1) })
			await update(weeklyRef, { jolines: increment(1) })
			await update(channelUsersRef, { jolines: increment(1) })
		} catch (error) {
			throw error
		}
	}

	export const getJolines = async (database: Database, channel: string, username?: string) => {
		try {
			if (username) {
				const jolinesRef = ref(database, `channels-users/${channel}/${username}/jolines`)
				const jolinesSnapshot = await get(jolinesRef)
				return jolinesSnapshot.val()
			}
			const jolinesRef = ref(database, `channels/${channel}/jolines`)
			const jolinesSnapshot = await get(jolinesRef)
			return jolinesSnapshot.val()
		} catch (error) {
			throw error
		}
	}

	export const onJolin =
		(database: Database) => async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				const cleanedMessage = message.trim().toLowerCase()
				const isNotJolin = !cleanedMessage.includes('jolin') || cleanedMessage.includes('jolines')
				if (self || isNotJolin) return

				const cleanedChannel = channel.replace('#', '')
				await incrementUserJolines(database, cleanedChannel, ctx.username!)
			} catch (error) {
				throw error
			}
		}

	export const onJolinesCommand =
		(bot: Client, database: Database) =>
		async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				const cleanedMessage = message.trim().toLowerCase()
				const isNotJolines = cleanedMessage !== '!jolines'
				if (self || isNotJolines) return

				const cleanedChannel = channel.replace('#', '')
				const jolines = await getJolines(database, cleanedChannel)
				bot.say(channel, MessagesHandlers.totalJolines(jolines))
			} catch (error) {
				throw error
			}
		}

	export const onJolinesUserCommand =
		(bot: Client, database: Database) =>
		async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				const cleanedMessage = message.trim().toLowerCase()
				const isJolinesUser = RegExpModule.jolinesUser.test(cleanedMessage)
				if (self || !isJolinesUser) return

				const cleanedChannel = channel.replace('#', '')
				const username = MessagesHandlers.getUsername(cleanedMessage)
				const jolines = await getJolines(database, cleanedChannel, username)
				bot.say(channel, MessagesHandlers.userJolines(jolines, username))
			} catch (error) {}
		}
}
