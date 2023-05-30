import { Dependencies } from 'types/container'

export class BaseRepository {
	private _dbHandler: Dependencies['dbHandler']

	constructor({ dbHandler }: Pick<Dependencies, 'dbHandler'>) {
		this._dbHandler = dbHandler
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
}
