import type { Pig } from 'domain/types/Emoji'

export interface GetChannelJolinesCommandConstructor {
	channelName: string
}

export interface GetChannelJolinesResponseConstructor {
	jolines: number
	pig: Pig
}
