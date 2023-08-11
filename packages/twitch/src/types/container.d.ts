import type { AfordiBot } from '@afordibot/core'
import type { CronJob } from 'cron'
import type { Client } from 'tmi.js'
import type dayjs from 'dayjs'

import type { CronService } from 'infrastructure/services/cron'
import type { CommandService } from 'infrastructure/services/command'
import type { TextParserService } from 'infrastructure/services/textParser'
import type { TimeoutService } from 'src/infrastructure/services/timeout'

import type { TwitchBot } from 'infrastructure/irc/twitchBot'
import type { CronJobs } from 'infrastructure/cronJobs/cronJobs'

export interface Dependencies {
	// Core
	afordibot: AfordiBot

	// Values
	CronJob: typeof CronJob
	TmiClient: typeof Client
	dayjs: typeof dayjs

	// Infrastructure
	cronService: CronService
	commandService: CommandService
	textParserService: TextParserService
	timeoutService: TimeoutService

	// Entry points
	twitchBot: TwitchBot
	cronJobs: CronJobs
}
