import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'

import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { CronJob } from 'cron'

import { DateService } from 'domain/services/date'
import { EmojiService } from 'domain/services/emoji'
import { UserGeneratorService } from 'domain/services/userGenerator'

import { AfordiBot } from 'infrastructure/irc/afordibot'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { CronService } from 'infrastructure/services/cron'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { CommandValidator } from 'infrastructure/services/commandValidator'
import { TextParser } from 'infrastructure/services/textParser'

import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { userDocumentParser } from 'infrastructure/persistance/firebase/user/userDocumentParser'
import { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'
import { imageDocumentParser } from 'infrastructure/persistance/firebase/image/imageDocumentParser'

import { GetChannelAflores } from 'application/getChannelAflores'
import { GetChannelJolines } from 'application/getChannelJolines'
import { GetUserJolines } from 'application/getUserJolines'
import { IncrementAflores } from 'application/incrementAflores'
import { IncrementJolines } from 'application/incrementJolines'
import { ResetRanking } from 'application/resetRanking'

import type { Dependencies } from 'types/container'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Europe/Madrid')

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Values
	axios: asValue(axios),
	dayjs: asValue(dayjs),
	CronJob: asValue(CronJob),

	// Domain services
	dateService: asClass(DateService).singleton(),
	emojiService: asClass(EmojiService).singleton(),
	userGenerator: asClass(UserGeneratorService),

	// Infrastructure services
	afordibot: asClass(AfordiBot).singleton(),
	httpClient: asClass(AxiosHttpClient),
	cronService: asClass(CronService).singleton(),
	restHelixClient: asClass(RestHelixClient),
	commandValidator: asClass(CommandValidator),
	textParser: asClass(TextParser),

	// Persistance
	dbHandler: asClass(FirebaseHandler).singleton(),
	userDocumentParser: asFunction(userDocumentParser),
	userRepository: asClass(UserRepository),
	imageDocumentParser: asFunction(imageDocumentParser),

	// Use cases
	getChannelAflores: asClass(GetChannelAflores),
	getChannelJolines: asClass(GetChannelJolines),
	getUserJolines: asClass(GetUserJolines),
	incrementAflores: asClass(IncrementAflores),
	incrementJolines: asClass(IncrementJolines),
	resetRanking: asClass(ResetRanking),
})

export { container }
