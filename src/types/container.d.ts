import { AxiosStatic } from 'axios'
import { EmojiService } from 'domain/services/emoji'
import { AxiosHttpClient } from 'infrastructure/services/axiosHttpClient'

export interface Dependencies {
	axios: AxiosStatic
	emojiService: EmojiService
	httpClient: AxiosHttpClient
}
