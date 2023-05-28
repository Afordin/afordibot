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

// User repository
export interface FindByUsername {
	username: string
	collection: 'users' | 'channels'
}

export interface FindByUsernameAndChannel {
	username: string
	channel: string
}

export interface SaveByUsername {
	user: User
	collection: 'users' | 'channels'
}

export interface SaveByUsernameAndChannel {
	user: User
	channel: string
}
