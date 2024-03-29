import { createContainer, InjectionMode, asValue, asClass } from 'awilix'

import { AfordiBot } from '@afordibot/core'
import { CronJob } from 'cron'
import { Client } from 'tmi.js'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import { CronService } from 'infrastructure/services/cron'
import { CommandService } from 'infrastructure/services/command'
import { TextParserService } from 'infrastructure/services/textParser'
import { TimeoutService } from 'infrastructure/services/timeout'
import { DateBuilder } from 'infrastructure/services/date'
import { Utils } from 'infrastructure/services/utils'

import { TwitchBot } from 'infrastructure/irc/twitchBot'
import { CronJobs } from 'infrastructure/cronJobs/cronJobs'
import { config } from 'infrastructure/config'

import { DomDomDom } from 'application/domDomDom'
import { GetBestMonthClip } from 'application/getBestMonthClip'

import type { Dependencies } from 'types/container'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Europe/Madrid')

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Core
	afordibot: asValue(new AfordiBot({ ...config })),

	// Values
	CronJob: asValue(CronJob),
	TmiClient: asValue(Client),
	dayjs: asValue(dayjs),

	// Infrastructure
	cronService: asClass(CronService).singleton(),
	commandService: asClass(CommandService),
	textParserService: asClass(TextParserService),
	timeoutService: asClass(TimeoutService).singleton(),
	dateBuilder: asClass(DateBuilder),
	utils: asClass(Utils),

	// Entry points
	twitchBot: asClass(TwitchBot).singleton(),
	cronJobs: asClass(CronJobs).singleton(),

	// Use cases
	domDomDom: asClass(DomDomDom),
	getBestMonthClip: asClass(GetBestMonthClip),
})

export { container }
