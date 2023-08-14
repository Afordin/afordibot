import type { AxiosStatic } from 'axios'
import type admin from 'firebase-admin'
import type dayjs from 'dayjs'

import type { DateService } from 'domain/services/date'
import type { EmojiService } from 'domain/services/emoji'
import type { UserGeneratorService } from 'domain/services/userGenerator'

import type { Config } from 'infrastructure/config'
import type { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import type { RestHelixClient } from 'infrastructure/services/restHelixClient'
import type { Utils } from 'infrastructure/services/utils'

import type { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import type { UserDocumentParser } from 'infrastructure/types/userRepository'
import type { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'
import type { ImageDocumentParser } from 'infrastructure/types/imageRepository'
import type { ImageRepository } from 'infrastructure/persistance/firebase/image/imageRepository'

import type { GetChannelAflores } from 'application/getChannelAflores'
import type { GetChannelJolines } from 'application/getChannelJolines'
import type { GetUserJolines } from 'application/getUserJolines'
import type { IncrementAflores } from 'application/incrementAflores'
import type { IncrementJolines } from 'application/incrementJolines'
import type { ResetRanking } from 'application/resetRanking'
import type { UpdateUsersImages } from 'application/updateUsersImages'

export interface Dependencies {
	// Libraries
	axios: AxiosStatic
	admin: typeof admin
	dayjs: typeof dayjs

	// Domain services
	dateService: DateService
	emojiService: EmojiService
	userGenerator: UserGeneratorService

	// Infrastructure config
	config: Config

	// Infrastructure services
	httpClient: AxiosHttpClient
	restHelixClient: RestHelixClient
	utils: Utils

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
	updateUsersImages: UpdateUsersImages
}
