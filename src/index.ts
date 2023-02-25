import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

import 'module-alias/register'
import tmi from 'tmi.js'

import { Bot } from 'config/Bot'
import { Firebase } from 'config/Firebase'
import { BotHandlers } from 'handlers/bot'

const launch = async () => {
	try {
		const options = await Bot.createBotOptions()
		const bot = new tmi.Client(options)
		const firebase = new Firebase()
		bot.on('connected', () => console.log('[+] Bot connected'))
		bot.on('message', BotHandlers.onMessage(bot, firebase.database))
		bot.connect()
	} catch (error) {
		console.error(error)
	}
}

launch()
