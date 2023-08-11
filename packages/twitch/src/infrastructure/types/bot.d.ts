export interface BotCommand {
	channelName: string
}

export interface JolinCommand extends BotCommand {
	username: string
}

export interface JolinesCommand extends BotCommand {
	message: string
}

export interface AflorCommand extends BotCommand {
	username: string
	message: string
}