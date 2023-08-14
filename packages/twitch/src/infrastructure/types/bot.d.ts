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

export interface DomDomDomCommand extends BotCommand {
	command: string
}

export interface ClipCommand extends BotCommand {
	command: string
}
