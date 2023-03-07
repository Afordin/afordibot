import { JolinesTypes } from 'types/Aflores.types'
import { AfloresTypes } from 'types/Jolines.types'

export namespace FirebaseTypes {
	export type DatabaseRef = 'users' | 'channels' | 'weekly' | 'monthly' | 'channels-users'

	export type User = JolinesTypes.JolinesUser & AfloresTypes.AfloresUser

	export interface UsersRanking {
		[key: string]: User
	}

	export interface ChannelUsers {
		[key: string]: UsersRanking
	}
}
