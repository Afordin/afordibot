import { ref, get, update, increment, Database } from 'firebase/database'
import { ChatUserstate, Client } from 'tmi.js'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { getRandomFlower } from 'utils/getRandomFlower'
import { RegExp } from 'utils/regExp'

dayjs.extend(utc)
dayjs.extend(timezone)

export module BotEvents {
	const TIMEZONE = 'Europe/Madrid'
	const DATE_FORMAT = 'DDMMYYYY'

	export const incrementUserJolines = async (database: Database, channel: string, username: string) => {
		try {
			const userKey = username.toLowerCase()
			const date = dayjs().tz(TIMEZONE).format(DATE_FORMAT)

			const jolinesRef = ref(database, `${channel}/jolines`)
			const usersRef = ref(database, `${channel}/jolines/users`)
			const datesTotalRef = ref(database, `${channel}/jolines/dates/${date}`)
			const datesUsersRef = ref(database, `${channel}/jolines/dates/${date}/users`)

			await update(jolinesRef, { total: increment(1) })
			await update(datesTotalRef, { total: increment(1) })
			await update(usersRef, { [userKey]: increment(1) })
			await update(datesUsersRef, { [userKey]: increment(1) })
		} catch (error) {
			throw error
		}
	}

	export const getJolines = async (database: Database, channel: string, username?: string) => {
		try {
			if (username) {
				const jolinesRef = ref(database, `${channel}/jolines/users/${username}`)
				const jolinesSnapshot = await get(jolinesRef)
				return jolinesSnapshot.val()
			}
			const jolinesRef = ref(database, `${channel}/jolines/total`)
			const jolinesSnapshot = await get(jolinesRef)
			return jolinesSnapshot.val()
		} catch (error) {
			throw error
		}
	}

	export const onMessage =
		(bot: Client, database: Database) =>
		async (channel: string, ctx: ChatUserstate, message: string, self: boolean) => {
			try {
				if (self) return
				const cleanedChannel = channel.replace('#', '')
				const cleanedMessage = message.trim().toLowerCase()

				if (cleanedMessage === '!jolines') {
					const jolines = await getJolines(database, cleanedChannel)
					bot.say(channel, `Llevamos ${jolines} jolines ${getRandomFlower()}!`)
				} else if (RegExp.jolinesUser.test(cleanedMessage)) {
					const username = cleanedMessage.split(' ')[1].replace('@', '')
					const jolines = await getJolines(database, cleanedChannel, username)
					if(!jolines) return bot.say(channel, `@${username} no tiene jolines :c`)
					bot.say(channel, `@${username} lleva ${jolines} jolines ${getRandomFlower()}!`)
				} else if (cleanedMessage.includes('jolin') && !cleanedMessage.includes('jolines')) {
					await incrementUserJolines(database, cleanedChannel, ctx.username!)
				}
			} catch (error) {
				throw error
			}
		}
}
