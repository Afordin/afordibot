import { createContainer, InjectionMode, asValue, asClass } from 'awilix'
import axios from 'axios'

import { EmojiService } from 'domain/services/emoji'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'

import type { Dependencies } from 'types/container'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	axios: asValue(axios),
	emojiService: asClass(EmojiService).singleton(),
	httpClient: asClass(AxiosHttpClient),
})
