import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

import 'module-alias/register'
import tmi from 'tmi.js'

import { Bot } from 'config/Bot'
import { Firebase } from 'config/Firebase'
import { BotEvents } from 'handlers/bot'

const launch = async () => {
	try {
		const options = await Bot.createBotOptions()
		const bot = new tmi.Client(options)
		const firebase = new Firebase()
		bot.on('connected', () => console.log('[+] Bot connected'))
		bot.on('message', BotEvents.onMessage(bot, firebase.database))
		bot.connect()
	} catch (error) {
		console.error(error)
	}
}

launch()
