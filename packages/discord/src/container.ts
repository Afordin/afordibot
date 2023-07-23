import { createContainer, InjectionMode, asValue } from 'awilix'
import * as discordjs from 'discord.js'

import { Dependencies } from 'types/container'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	discordjs: asValue(discordjs),
})

export { container }
