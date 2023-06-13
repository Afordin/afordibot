import { AxiosStatic } from 'axios'
import dayjs from 'dayjs'
import { CronJob } from 'cron'

import { DateService } from 'domain/services/date'
import { EmojiService } from 'domain/services/emoji'
import { UserGeneratorService } from 'domain/services/userGenerator'

import { AfordiBot } from 'infrastructure/irc/afordibot'
import { CronJobs } from 'src/infrastructure/cron/cronJobs'

import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { CronService } from 'src/infrastructure/services/cron'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { CommandValidator } from 'infrastructure/services/commandValidator'
import { TextParser } from 'infrastructure/services/textParser'

import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { UserDocumentParser } from 'infrastructure/types/userRepository'
import { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'
import { ImageDocumentParser } from 'infrastructure/types/imageRepository'
import { ImageRepository } from 'infrastructure/persistance/firebase/image/imageRepository'

import { GetChannelAflores } from 'application/getChannelAflores'
import { GetChannelJolines } from 'application/getChannelJolines'
import { GetUserJolines } from 'application/getUserJolines'
import { IncrementAflores } from 'application/incrementAflores'
import { IncrementJolines } from 'application/incrementJolines'
import { ResetRanking } from 'application/resetRanking'
import { GetUsersImages } from 'application/getUsersImages'

export interface Dependencies {
	// Values
	axios: AxiosStatic
	dayjs: typeof dayjs
	CronJob: typeof CronJob

	// Domain services
	dateService: DateService
	emojiService: EmojiService
	userGenerator: UserGeneratorService

	// Entry points
	afordibot: AfordiBot
	cronJobs: CronJobs

	// Infrastructure services
	httpClient: AxiosHttpClient
	cronService: CronService
	restHelixClient: RestHelixClient
	commandValidator: CommandValidator
	textParser: TextParser

	// Persistance
	dbHandler: FirebaseHandler
	userDocumentParser: UserDocumentParser
	userRepository: UserRepository
	imageDocumentParser: ImageDocumentParser
	imageRepository: ImageRepository

	// Use cases
	getChannelAflores: GetChannelAflores
	getChannelJolines: GetChannelJolines
	getUserJolines: GetUserJolines
	incrementAflores: IncrementAflores
	incrementJolines: IncrementJolines
	resetRanking: ResetRanking
	getUsersImages: GetUsersImages
}
