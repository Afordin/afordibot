import { AxiosStatic } from 'axios'
import { EmojiService } from 'domain/services/emoji'
import { UserGeneratorService } from 'domain/services/userGenerator'

import { AfordiBot } from 'infrastructure/irc/afordibot'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { CommandValidator } from 'infrastructure/services/commandValidator'
import { TextParser } from 'infrastructure/services/textParser'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { UserDocumentParser } from 'infrastructure/types/firebase'
import { UserRepository } from 'infrastructure/persistance/firebase/user/userRepository'

import { GetChannelAflores } from 'application/getChannelAflores'
import { GetChannelJolines } from 'application/getChannelJolines'
import { GetUserJolines } from 'application/getUserJolines'
import { IncrementAflores } from 'application/incrementAflores'
import { IncrementJolines } from 'application/incrementJolines'

export interface Dependencies {
	axios: AxiosStatic
	emojiService: EmojiService
	userGenerator: UserGeneratorService
	afordibot: AfordiBot
	httpClient: AxiosHttpClient
	restHelixClient: RestHelixClient
	commandValidator: CommandValidator
	textParser: TextParser
	dbHandler: FirebaseHandler
	userDocumentParser: UserDocumentParser
	userRepository: UserRepository
	getChannelAflores: GetChannelAflores
	getChannelJolines: GetChannelJolines
	getUserJolines: GetUserJolines
	incrementAflores: IncrementAflores
	incrementJolines: IncrementJolines
}
