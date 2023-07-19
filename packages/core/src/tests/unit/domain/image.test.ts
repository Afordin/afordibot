// @ts-nocheck
import { describe, test, expect } from 'vitest'
import { Image } from 'domain/image/Image'

describe('Instantiate image entity', () => {
	const VALID_IMAGE = {
		username: 'afordibot',
		updatedAt: '04062023',
		imageUrl:
			'https://static-cdn.jtvnw.net/jtv_user_pictures/f76406d1-dd3c-4243-a103-e5d3c2cf471f-profile_image-70x70.png',
	}

	// Type validation
	test('should be a function', () => {
		expect(typeof Image).toBe('function')
	})

	test('should return an object', () => {
		const user = new Image(VALID_IMAGE)
		expect(typeof user).toBe('object')
	})

	// Properties validation
	test('should return an object with the correct properties', () => {
		const user = new Image(VALID_IMAGE)
		expect(user.username).toBe(VALID_IMAGE.username)
		expect(user.imageUrl).toBe(VALID_IMAGE.imageUrl)
		expect(user.updatedAt.length).toEqual(8)
	})

	// Username validation
	test('should throw an error if username is not a string', () => {
		expect(() => new Image({ ...VALID_IMAGE, username: 123 })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: {} })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: [] })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: true })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: null })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: undefined })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: 123n })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: Symbol('afordibot') })).toThrow()
	})

	test('should throw an error if username has length less than 4', () => {
		expect(() => new Image({ ...VALID_IMAGE, username: '123' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: '12' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: '1' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, username: 'afordibot' })).not.toThrow()
	})

	// Image URL validation
	test('should throw an error if imageUrl is not a string', () => {
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: 123 })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: {} })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: [] })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: true })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: null })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: undefined })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: 123n })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, imageUrl: Symbol('afordibot') })).toThrow()
	})

	// UpdatedAt validation
	test('should throw an error if updatedAt is not a string', () => {
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: 123 })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: {} })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: [] })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: true })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: null })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: undefined })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: 123n })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: Symbol('afordibot') })).toThrow()
	})

	test('should throw an error if updatedAt has length different than 8', () => {
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: '123' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: '123456789' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: '1234567' })).toThrow()
		expect(() => new Image({ ...VALID_IMAGE, updatedAt: '12345678' })).not.toThrow()
	})
})
