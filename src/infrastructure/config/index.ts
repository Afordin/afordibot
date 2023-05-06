import dotenv from 'dotenv'
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const config = {
	firebase: {
		credential: {
			projectId: process.env.FIREBASE_PROJECT_ID!,
			privateKey: process.env.FIREBASE_PRIVATE_KEY!,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
		},
		databaseURL: process.env.FIREBASE_DATABASE_URL!,
	},
	helix: {
		clientId: process.env.BOT_ID!,
		clientSecret: process.env.BOT_SECRET!,
		grantType: 'client_credentials',
	},
	bot: {
		connection: {
			secure: true,
			reconnect: true,
		},
		identity: {
			username: process.env.BOT_USERNAME!,
			password: process.env.BOT_PASSWORD!,
		},
		channels: process.env.BOT_CHANNELS!.split(' '),
	},
}

export { config }
