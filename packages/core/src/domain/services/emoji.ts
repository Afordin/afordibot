import type { Aflor, Pig } from 'domain/types/Emoji'

export class EmojiService {
	public aflorOptions: Aflor[] = ['🌺', '🌻', '🌹', '🥀', '🌷', '🌼', '🌸', '💐', '🍄']
	public pigOptions: Pig[] = ['🐷', '🐽', '🐖']

	public getRandomAflor(): Aflor {
		const randomIndex = Math.floor(Math.random() * this.aflorOptions.length)
		return this.aflorOptions[randomIndex]
	}

	public getRandomPig(): Pig {
		const randomIndex = Math.floor(Math.random() * this.pigOptions.length)
		return this.pigOptions[randomIndex]
	}
}
