import { UserEntity } from 'domain/types/User'
import { User } from 'domain/user/User'

export interface UserDocumentParser {
	toDomain: (user: UserEntity) => User
	toDocument: (user: User) => UserEntity
}

export interface UserCollection {
	collection: 'users' | 'channels' | 'weekly' | 'monthly'
}

export interface FindByUsername extends UserCollection {
	username: string
}

export interface FindByUsernameAndChannel {
	username: string
	channelName: string
}

export interface SaveByUsername extends UserCollection {
	user: User
}

export interface SaveByUsernameAndChannel {
	user: User
	channelName: string
}
