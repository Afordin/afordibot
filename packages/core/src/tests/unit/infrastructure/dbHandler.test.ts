// @ts-nocheck
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'

describe('Instantiate dbHandler', () => {
	let dbHandler: FirebaseHandler
	const configMock = {
		firebaseConfig: {
			credential: {
				projectId: process.env.FIREBASE_PROJECT_ID!,
				privateKey: process.env.FIREBASE_PRIVATE_KEY!,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
			},
			databaseURL: process.env.FIREBASE_DATABASE_URL!,
		},
	}

	beforeEach(() => {
		dbHandler = new FirebaseHandler({ config: configMock })
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
