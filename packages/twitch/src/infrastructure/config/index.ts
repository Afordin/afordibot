export const config = {
	firebaseConfig: {
		credential: {
			projectId: process.env.FIREBASE_PROJECT_ID!,
			privateKey: process.env.FIREBASE_PRIVATE_KEY!,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
		},
		databaseURL: process.env.FIREBASE_DATABASE_URL!,
	},
	helixConfig: {
		clientId: process.env.BOT_ID!,
		clientSecret: process.env.BOT_SECRET!,
		grantType: 'client_credentials',
	},
	botConfig: {
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
