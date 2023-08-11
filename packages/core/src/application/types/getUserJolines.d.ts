import type { Pig } from 'domain/types/Emoji'

export interface GetUserJolinesCommandConstructor {
	username: string
	channelName: string
}

export interface GetUserJolinesResponseConstructor {
	username: string
	jolines: number
	pig: Pig
}
