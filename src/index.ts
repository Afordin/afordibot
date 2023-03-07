import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

import 'module-alias/register'
import tmi from 'tmi.js'

import { Bot } from 'config/Bot'
import { Firebase } from 'config/Firebase'
import { JolinesHandler } from 'handlers/jolines'
import { AfloresHandler } from 'handlers/aflores'

const launch = async () => {
	try {
		const options = await Bot.createBotOptions()
		const bot = new tmi.Client(options)
		const firebase = new Firebase()
		bot.on('connected', () => console.log('[+] Bot connected'))
		bot.on('message', JolinesHandler.onJolin(firebase.database))
		bot.on('message', JolinesHandler.onJolinesCommand(bot, firebase.database))
		bot.on('message', JolinesHandler.onJolinesUserCommand(bot, firebase.database))
		bot.on('message', AfloresHandler.onAflorUser(bot, firebase.database))
		bot.on('message', AfloresHandler.onAfloresCommand(bot, firebase.database))
		bot.connect()
	} catch (error) {
		console.error(error)
	}
}

launch()
