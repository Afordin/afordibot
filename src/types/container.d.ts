import { AxiosStatic } from 'axios'
import { EmojiService } from 'domain/services/emoji'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { CommandValidator } from 'infrastructure/services/commandValidator'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'
import { UserDocumentParser } from 'infrastructure/types/firebase'

export interface Dependencies {
	axios: AxiosStatic
	emojiService: EmojiService
	httpClient: AxiosHttpClient
	restHelixClient: RestHelixClient
	commandValidator: CommandValidator
	dbHandler: FirebaseHandler
	userDocumentParser: UserDocumentParser
}
