import type { app, database } from 'firebase-admin'
import type { Dependencies } from 'types/container'
import type { DbHandler } from 'infrastructure/types/firebase'

export class FirebaseHandler implements DbHandler {
	private _admin: Dependencies['admin']
	private _config: Dependencies['config']

	private _app: app.App | null = null
	private _db: database.Database | null = null
	private _instance: database.Database | null = null

	constructor({ admin, config }: Pick<Dependencies, 'admin' | 'config'>) {
		this._admin = admin
		this._config = config
	}

	private _connect() {
		try {
			this._app = this._admin.initializeApp({
				credential: this._admin.credential.cert(this._config.firebaseConfig.credential),
				databaseURL: this._config.firebaseConfig.databaseURL,
			})
			this._db = this._admin.database(this._app)
			return this._db
		} catch (error) {
			console.log(`Error in database connection: ${error}`)
			throw new Error(`Error in database connection: ${error}`)
		}
	}

	private _createInstance() {
		return this._connect()
	}

	public getInstance() {
		if (!this._instance) {
			this._instance = this._createInstance()
		}
		return this._instance
	}

	public disconnect() {
		if (this._app) {
			this._app.delete()
		}
		this._app = null
		this._db = null
		this._instance = null
	}
}
