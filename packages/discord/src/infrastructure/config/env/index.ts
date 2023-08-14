import { EnvConfig } from 'infrastructure/types/config'

export const config: EnvConfig = {
	discord: {
		token: process.env.BOT_TOKEN!,
		id: process.env.BOT_ID!,
	},
	firebase: {
		credential: {
			projectId: process.env.FIREBASE_PROJECT_ID!,
			privateKey: process.env.FIREBASE_PRIVATE_KEY!,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
		},
		databaseURL: process.env.FIREBASE_DATABASE_URL!,
	},
}
