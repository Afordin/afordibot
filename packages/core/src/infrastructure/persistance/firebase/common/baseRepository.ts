import type { Dependencies } from 'types/container'
import type { BaseCollection, DocumentKeys } from 'infrastructure/types/baseRepository'

export class BaseRepository {
	private _config: Dependencies['config']
	private _dbHandler: Dependencies['dbHandler']
	private _httpClient: Dependencies['httpClient']

	constructor({ config, dbHandler, httpClient }: Pick<Dependencies, 'config' | 'dbHandler' | 'httpClient'>) {
		this._config = config
		this._dbHandler = dbHandler
		this._httpClient = httpClient
	}

	protected async _find<T = any>(collection: string) {
		const db = this._dbHandler.getInstance()
		try {
			const ref = await db.ref(collection).once('value')
			return ref.val() as T | null
		} catch (error: any) {
			throw new Error(error)
		}
	}

	protected async _save<T = any>(collection: string, data: T) {
		const db = this._dbHandler.getInstance()
		try {
			await db.ref(collection).set(data)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	protected async _delete(collection: string) {
		const db = this._dbHandler.getInstance()
		try {
			await db.ref(collection).remove()
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async findKeys(collection: BaseCollection) {
		try {
			const url = `${this._config.firebaseConfig.databaseURL}/${collection}.json?shallow=true`
			const keys = await this._httpClient.get<DocumentKeys | null>({ url })
			if (!keys) return []
			return Object.keys(keys)
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
