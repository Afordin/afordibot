export interface FirebaseConfig {
	credential: {
		projectId: string
		privateKey: string
		clientEmail: string
	}
	databaseURL: string
}

export interface HelixConfig {
	clientId: string
	clientSecret: string
	grantType: string
}

export interface ConfigConstructor {
	firebaseConfig: FirebaseConfig
	helixConfig: HelixConfig
}
