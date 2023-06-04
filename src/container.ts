import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import axios from 'axios'

import { EmojiService } from 'domain/services/emoji'
import { UserGeneratorService } from 'domain/services/userGenerator'

import { AfordiBot } from 'infrastructure/irc/afordibot'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
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

import type { Dependencies } from 'types/container'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Values
	axios: asValue(axios),

	// Domain services
	emojiService: asClass(EmojiService).singleton(),
	userGenerator: asClass(UserGeneratorService),

	// Infrastructure services
	afordibot: asClass(AfordiBot).singleton(),
	httpClient: asClass(AxiosHttpClient),
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
})

export { container }
