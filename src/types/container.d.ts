import { AxiosStatic } from 'axios'
import { EmojiService } from 'domain/services/emoji'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'
import { RestHelixClient } from 'infrastructure/services/restHelixClient'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'

export interface Dependencies {
	axios: AxiosStatic
	emojiService: EmojiService
	httpClient: AxiosHttpClient
	restHelixClient: RestHelixClient
	dbHandler: FirebaseHandler
}
