// @ts-nocheck
import { describe, test, expect } from 'vitest'
import { User } from 'domain/user/User'

describe('Instantiate user entity', () => {
	const VALID_USER = { username: 'afordibot', jolines: 0, aflores: { total: 0 } }
	// Type validation
	test('should be a function', () => {
		expect(typeof User).toBe('function')
	})

	test('should return an object', () => {
		const user = new User(VALID_USER)
		expect(typeof user).toBe('object')
	})

	// Properties validation
	test('should return an object with the correct properties', () => {
		const user = new User(VALID_USER)
		expect(user.username).toBe('afordibot')
		expect(user.jolines).toBe(0)
		expect(Object.keys(user.aflores)).toEqual(['total'])
		expect(user.aflores.total).toBe(0)
	})

	// Username validation
	test('should throw an error if username is not a string', () => {
		expect(() => new User({ jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 0, jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 0n, jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: null, jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: () => {}, jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: [], jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: {}, jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.username = 10
		}).toThrow()
		expect(() => new User(VALID_USER)).not.toThrow()
	})

	test('should throw an error if username has length less than 4', () => {
		expect(() => new User({ username: 'a', jolines: 0, aflores: { total: 0 } })).toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.username = 'a'
		}).toThrow()
	})

	// Jolines validation
	test('should throw an error if jolines is not a number', () => {
		expect(() => new User({ username: 'afordibot', aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0n, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: null, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: () => {}, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: [], aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: {}, aflores: { total: 0 } })).toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.jolines = '10'
		}).toThrow()
		expect(() => new User(VALID_USER)).not.toThrow()
	})

	test('should throw an error if jolines is not a positive integer', () => {
		expect(() => new User({ username: 'afordibot', jolines: -1, aflores: { total: 0 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0.1, aflores: { total: 0 } })).toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.jolines = -1
		}).toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.jolines = 0.1
		}).toThrow()
	})

	// Aflores validation
	test('should throw an error if aflores does not satisfy the AflorValue interface', () => {
		expect(() => new User({ username: 'afordibot', jolines: 0 })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: {} })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: 0n })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: null })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: () => {} })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: [] })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: {} })).toThrow()
		expect(() => new User(VALID_USER)).not.toThrow()
	})

	test('should throw an error if aflores.total is not a positive integer', () => {
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: { total: 0.1 } })).toThrow()
		expect(() => new User({ username: 'afordibot', jolines: 0, aflores: { total: -1 } })).toThrow()
		expect(() => new User(VALID_USER)).not.toThrow()
		expect(() => {
			const user = new User(VALID_USER)
			user.aflores = { total: 0.1 }
		}).toThrow()
	})
})
