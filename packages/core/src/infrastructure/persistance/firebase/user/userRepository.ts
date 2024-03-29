import { BaseRepository } from '../common/baseRepository'
import type { Dependencies } from 'types/container'
import type { UserEntity } from 'domain/types/User'
import type {
	FindByUsername,
	FindByUsernameAndChannel,
	SaveByUsername,
	SaveByUsernameAndChannel,
	UserCollection,
} from 'infrastructure/types/userRepository'

export class UserRepository extends BaseRepository {
	private _userDocumentParser: Dependencies['userDocumentParser']

	constructor({
		config,
		dbHandler,
		httpClient,
		userDocumentParser,
	}: Pick<Dependencies, 'config' | 'dbHandler' | 'httpClient' | 'userDocumentParser'>) {
		super({ config, dbHandler, httpClient })
		this._userDocumentParser = userDocumentParser
	}

	public async findByUsername({ username, collection }: FindByUsername) {
		try {
			const userData = await this._find<Omit<UserEntity, 'username'>>(`${collection}/${username}`)
			return userData && this._userDocumentParser.toDomain({ username, ...userData })
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async findByUsernameAndChannel({ username, channelName }: FindByUsernameAndChannel) {
		try {
			const collection = `channels-users/${channelName}/${username}`
			const userData = await this._find<Omit<UserEntity, 'username'>>(collection)
			return userData && this._userDocumentParser.toDomain({ username, ...userData })
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async saveByUsername({ user, collection }: SaveByUsername) {
		try {
			const { username, ...data } = this._userDocumentParser.toDocument(user)
			await this._save(`${collection}/${username}`, data)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async saveByUsernameAndChannel({ user, channelName }: SaveByUsernameAndChannel) {
		try {
			const { username, ...data } = this._userDocumentParser.toDocument(user)
			const collection = `channels-users/${channelName}/${username}`
			await this._save(collection, data)
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async delete({ collection }: UserCollection) {
		try {
			await this._delete(collection)
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
