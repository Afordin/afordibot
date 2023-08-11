import { EnvConfig } from 'infrastructure/types/config'

export const config: EnvConfig = {
	discord: {
		token: process.env.BOT_TOKEN!,
		id: process.env.BOT_ID!,
	},
}
