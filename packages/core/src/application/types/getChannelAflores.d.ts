import type { Aflor } from 'domain/types/Emoji'

export interface GetChannelAfloresCommandConstructor {
	channelName: string
}

export interface GetChannelAfloresResponseConstructor {
	aflores: number
	aflor: Aflor
}
