import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` })

import 'module-alias/register'
import { Bot } from 'config/Bot'
import { Firebase } from 'config/Firebase'
import { BotService } from 'services/bot.service'
import { JolinesHandler } from 'handlers/jolines'
import { AfloresHandler } from 'handlers/aflores'

const launch = async () => {
	try {
		const firebase = new Firebase()
		const bot = new Bot(await BotService.getTokenResponse())
		bot.client.on('connected', () => console.log('[+] Bot connected'))
		bot.client.on('message', JolinesHandler.onJolin(bot, firebase.database))
		bot.client.on('message', JolinesHandler.onJolinesCommand(bot, firebase.database))
		bot.client.on('message', JolinesHandler.onJolinesUserCommand(bot, firebase.database))
		bot.client.on('message', AfloresHandler.onAflorUser(bot, firebase.database))
		bot.client.on('message', AfloresHandler.onAfloresCommand(bot, firebase.database))
		bot.client.connect()
	} catch (error) {
		console.log('MainFunction:launch -->', error)
		console.error(error)
	}
}

launch()
