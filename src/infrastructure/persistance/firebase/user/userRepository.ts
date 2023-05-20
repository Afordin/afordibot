import { User } from 'domain/user/User'
import { UserEntity } from 'domain/types/User'
import { Dependencies } from 'types/container'
import { BaseRepository } from '../common/baseRepository'

export class UserRepository extends BaseRepository {
	private _userDocumentParser: Dependencies['userDocumentParser']

	constructor({ dbHandler, userDocumentParser }: Pick<Dependencies, 'dbHandler' | 'userDocumentParser'>) {
		super({ dbHandler })
		this._userDocumentParser = userDocumentParser
	}

	public async findByUsername(username: string) {
		try {
			const userData = await this._find<Omit<UserEntity, 'username'>>(`users/${username}`)
			return userData && this._userDocumentParser.toDomain({ username, ...userData })
		} catch (error: any) {
			throw new Error(error)
		}
	}

	public async save(user: User) {
		try {
			const { username, ...data } = this._userDocumentParser.toDocument(user)
			await this._save(`users/${username}`, data)
		} catch (error: any) {
			throw new Error(error)
		}
	}
}
