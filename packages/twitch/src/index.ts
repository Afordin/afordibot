import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import 'module-alias/register'
import { container } from 'src/container'

const twitchBot = container.resolve('twitchBot')
const cronJobs = container.resolve('cronJobs')

twitchBot.connect()
cronJobs.start()
