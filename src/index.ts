import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import 'module-alias/register'
import { container } from 'src/container'

const afordibot = container.resolve('afordibot')
afordibot.connect()
