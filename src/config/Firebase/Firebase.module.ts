import { initializeApp, FirebaseApp } from 'firebase/app'
import { getDatabase, Database } from 'firebase/database'
import { getAuth, Auth, signInWithEmailAndPassword } from 'firebase/auth'

export class Firebase {
	app: FirebaseApp
	database: Database
	auth: Auth

	constructor() {
		this.app = initializeApp({
			apiKey: process.env.FIREBASE_API_KEY!,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
			databaseURL: process.env.FIREBASE_DATABASE_URL!,
			projectId: process.env.FIREBASE_PROJECT_ID!,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
			appId: process.env.FIREBASE_APP_ID!,
		})
		this.database = getDatabase(this.app)
		this.auth = getAuth(this.app)
		this.signIn(this.auth)
	}

	async signIn(auth: Auth) {
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				process.env.FIREBASE_EMAIL!,
				process.env.FIREBASE_PASSWORD!,
			)
			auth.updateCurrentUser(user)
		} catch (error) {
			console.log('FirebaseClass:signIn -->', error)
			throw error
		}
	}
}
