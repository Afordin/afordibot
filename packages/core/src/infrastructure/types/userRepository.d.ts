import { User } from 'domain/user/User'
import type { UserEntity } from 'domain/types/User'
import type { DocumentParser } from 'infrastructure/types/firebase'

export type UserDocumentParser = DocumentParser<UserEntity, User>

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
