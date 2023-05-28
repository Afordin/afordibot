// @ts-nocheck
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'

describe('Instantiate axios http client', () => {
	let dbHandler: FirebaseHandler

	beforeEach(() => {
		dbHandler = new FirebaseHandler()
	})

	test('should be a function', () => {
		expect(typeof FirebaseHandler).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof dbHandler).toBe('object')
		expect(typeof dbHandler.app).toBe('object')
		expect(typeof dbHandler.db).toBe('object')
		expect(typeof dbHandler.instance).toBe('object')
		expect(typeof dbHandler.getInstance).toBe('function')
		expect(typeof dbHandler.disconnect).toBe('function')
	})

	test('should create the database instances', () => {
		vi.spyOn(dbHandler, 'getInstance')
		dbHandler.getInstance()
		expect(dbHandler.app).not.toBeNull()
		expect(dbHandler.db).not.toBeNull()
		expect(dbHandler.instance).not.toBeNull()
	})

	test('should nullify the database instances', () => {
		vi.spyOn(dbHandler, 'disconnect')
		dbHandler.disconnect()
		expect(dbHandler.app).toBeNull()
		expect(dbHandler.db).toBeNull()
		expect(dbHandler.instance).toBeNull()
	})
})
