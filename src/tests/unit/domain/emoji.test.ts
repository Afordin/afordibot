// @ts-nocheck
import { describe, test, expect } from 'vitest'
import { EmojiService } from '../../../domain/services/emoji'

describe('Instantiate emoji service', () => {
	test('should be a function', () => {
		expect(typeof EmojiService).toBe('function')
	})

	test('should return an object', () => {
		const emojiService = new EmojiService()
		expect(typeof emojiService).toBe('object')
	})

	test('should return an object with the expected methods', () => {
		const emojiService = new EmojiService()
		expect(typeof emojiService.aflorOptions).toBe('object')
		expect(typeof emojiService.pigOptions).toBe('object')
		expect(typeof emojiService.aflorOptions.length).toBe('number')
		expect(typeof emojiService.pigOptions.length).toBe('number')
		expect(typeof emojiService.getRandomAflor).toBe('function')
		expect(typeof emojiService.getRandomPig).toBe('function')
	})

	test('getRandomAflor should return a random flower', () => {
		const emojiService = new EmojiService()
		const iterations = emojiService.aflorOptions.length
		for (let i = 0; i < iterations; i++) {
			const randomAflor = emojiService.getRandomAflor()
			expect(emojiService.aflorOptions).toContain(randomAflor)
		}
	})

	test('getRandomPig should return a random pig', () => {
		const emojiService = new EmojiService()
		const iterations = emojiService.pigOptions.length
		for (let i = 0; i < iterations; i++) {
			const randomPig = emojiService.getRandomPig()
			expect(emojiService.pigOptions).toContain(randomPig)
		}
	})
})
