import { createContainer, InjectionMode, asValue } from 'awilix'
import * as discordjs from 'discord.js'

import { config } from 'infrastructure/config/env'
import { Command } from 'infrastructure/config/command'
import { Option } from 'infrastructure/config/option'

import { Dependencies } from 'types/container'

const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// Libraries
	discordjs: asValue(discordjs),

	// Config
	config: asValue(config),
	command: asValue(Command),
	option: asValue(Option),
})

export { container }
