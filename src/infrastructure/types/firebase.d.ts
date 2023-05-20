import { database } from 'firebase-admin'
import { UserEntity } from 'domain/types/User'
import { User } from 'domain/user/User'

export interface DbHandler {
	getInstance: () => database.Database
	disconnect: () => void
}

export interface UserDocumentParser {
	toDomain: (user: UserEntity) => User
	toDocument: (user: User) => UserEntity
}
