import type { Option } from 'infrastructure/config/option'

export interface FirebaseConfig {
	credential: {
		projectId: string
		privateKey: string
		clientEmail: string
	}
	databaseURL: string
}

export interface DiscordConfig {
	token: string
	id: string
}

export interface EnvConfig {
	firebase: FirebaseConfig
	discord: DiscordConfig
}

export interface OptionConfig {
	name: string
	description?: string
}

export interface CommandConfig extends Required<OptionConfig> {
	options: Option[]
}
