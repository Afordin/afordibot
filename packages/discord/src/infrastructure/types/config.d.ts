import type { Option } from 'infrastructure/config/option'

export interface EnvConfig {
	discord: {
		token: string
		id: string
	}
}

export interface OptionConfig {
	name: string
	description?: string
}

export interface CommandConfig extends Required<OptionConfig> {
	options: Option[]
}
