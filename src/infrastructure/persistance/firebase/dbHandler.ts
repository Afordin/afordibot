import admin from 'firebase-admin'
import { config } from 'infrastructure/config'
import type { DbHandler } from 'infrastructure/types/firebase'

export class FirebaseHandler implements DbHandler {
	public app: admin.app.App | null = null
	public db: admin.database.Database | null = null
	public instance: admin.database.Database | null = null

	private _connect() {
		try {
			this.app = admin.initializeApp({
				credential: admin.credential.cert(config.firebase.credential),
				databaseURL: config.firebase.databaseURL,
			})
			this.db = admin.database(this.app)
			return this.db
		} catch (error) {
			console.log(`Error in database connection: ${error}`)
			throw new Error(`Error in database connection: ${error}`)
		}
	}

	private _createInstance() {
		return this._connect()
	}

	public getInstance() {
		if (!this.instance) {
			this.instance = this._createInstance()
		}
		return this.instance
	}

	public disconnect() {
		if (this.app) {
			this.app.delete()
		}
		this.app = null
		this.db = null
		this.instance = null
	}
}
