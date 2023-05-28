import { Aflor } from 'src/domain/types/Emoji'

export interface IncrementAfloresCommandConstructor {
	gifterName: string
	receiverName: string
	channelName: string
}

export interface IncrementAfloresResponseConstructor {
	gifterName: string
	receiverName: string
	aflor: Aflor
}
