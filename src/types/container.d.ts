import { AxiosStatic } from 'axios'
import { EmojiService } from 'domain/services/emoji'

export interface Dependencies {
	axios: AxiosStatic
	emojiService: EmojiService
}
