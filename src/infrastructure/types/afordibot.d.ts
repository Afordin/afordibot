export interface BotCommand {
	channelName: string
}

export interface IsJolin extends BotCommand {
	username: string
}

export interface IsUserJolines extends BotCommand {
	message: string
}

export interface IsUserAflor extends BotCommand {
	username: string
	message: string
}
