import type { Aflor, Pig } from 'domain/types/Emoji'
import type { HelixUserData } from 'infrastructure/types/restHelixClient'
import type { GetChannelAfloresCommand } from 'application/getChannelAflores'
import type { GetChannelJolinesCommand } from 'application/getChannelJolines'
import type { GetUserJolinesCommand } from 'application/getUserJolines'
import type { IncrementAfloresCommand } from 'application/incrementAflores'
import type { IncrementJolinesCommand } from 'application/incrementJolines'
import type { ResetRankingCommand } from 'application/resetRanking'

export interface GetAfloresResponse {
	message: string
	aflores: number
	aflor: Aflor
}

export interface GetJolinesResponse {
	message: string
	jolines: number
	pig: Pig
}

export interface IncrementAfloresResponse {
	message: string
	aflor: Aflor
}

export interface Bot {
	// Infrastructure services
	getHelixToken: () => Promise<string>
	getUsersData: (usernames: string[]) => Promise<HelixUserData[]>

	// Use cases
	getChannelAflores: (channelName: GetChannelAfloresCommand) => Promise<GetAfloresResponse>
	getChannelJolines: (command: GetChannelJolinesCommand) => Promise<GetJolinesResponse>
	getUserJolines: (command: GetUserJolinesCommand) => Promise<GetJolinesResponse>
	incrementAflores: (command: IncrementAfloresCommand) => Promise<IncrementAfloresResponse>
	incrementJolines: (command: IncrementJolinesCommand) => Promise<void>
	resetRanking: (command: ResetRankingCommand) => Promise<void>
	updateUsersImages: () => Promise<void>
}
