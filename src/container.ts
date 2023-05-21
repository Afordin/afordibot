import { createContainer, InjectionMode, asValue, asClass, asFunction } from 'awilix'
import axios from 'axios'

import { EmojiService } from 'domain/services/emoji'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { CommandValidator } from 'infrastructure/services/commandValidator'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { userDocumentParser } from 'infrastructure/persistance/firebase/user/userDocumentParser'
import { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'

import type { Dependencies } from 'types/container'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	axios: asValue(axios),
	emojiService: asClass(EmojiService).singleton(),
	httpClient: asClass(AxiosHttpClient),
	restHelixClient: asClass(RestHelixClient),
	commandValidator: asClass(CommandValidator),
	dbHandler: asClass(FirebaseHandler).singleton(),
	userDocumentParser: asFunction(userDocumentParser),
	userRepository: asClass(UserRepository),
})
