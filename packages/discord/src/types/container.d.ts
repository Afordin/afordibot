import type * as discordjs from 'discord.js'

import type { EnvConfig } from 'infrastructure/types/config'
import type { Command } from 'infrastructure/config/command'
import type { Option } from 'infrastructure/config/option'

export interface Dependencies {
	// Libraries
	discordjs: typeof discordjs

	// Config
	config: EnvConfig
	command: typeof Command
	option: typeof Option
}
