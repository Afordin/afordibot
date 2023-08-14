// @ts-nocheck
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { FirebaseHandler } from 'infrastructure/persistance/firebase/dbHandler'

describe('Instantiate dbHandler', () => {
	let dbHandler: FirebaseHandler
	const deleteMock = vi.fn()
	const adminMock = {
		initializeApp: vi.fn(),
		credential: { cert: vi.fn() },
		firestore: vi.fn(),
		database: vi.fn(),
	}
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
		dbHandler = new FirebaseHandler({ admin: adminMock, config: configMock })
	})

	afterEach(() => {
		vi.resetAllMocks()
	})

	test('should be a function', () => {
		expect(typeof FirebaseHandler).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof dbHandler).toBe('object')
		expect(typeof dbHandler.getInstance).toBe('function')
		expect(typeof dbHandler.disconnect).toBe('function')
	})

	test('should create the database instance', () => {
		adminMock.initializeApp.mockReturnValue({ delete: deleteMock })
		adminMock.credential.cert.mockReturnValue('cert')
		adminMock.database.mockReturnValue('database')

		expect(dbHandler.getInstance()).toBe('database')
		expect(dbHandler.getInstance()).toBe('database')
		expect(adminMock.initializeApp).toHaveBeenCalledTimes(1)
		expect(adminMock.credential.cert).toHaveBeenCalledTimes(1)
		expect(adminMock.database).toHaveBeenCalledTimes(1)
		expect(deleteMock).toHaveBeenCalledTimes(0)
	})

	test('should delete the app instance', () => {
		adminMock.initializeApp.mockReturnValue({ delete: deleteMock })
		adminMock.credential.cert.mockReturnValue('cert')
		adminMock.database.mockReturnValue('database')

		expect(dbHandler.getInstance()).toBe('database')
		expect(dbHandler.disconnect()).toBeUndefined()
		expect(dbHandler.disconnect()).toBeUndefined()
		expect(deleteMock).toHaveBeenCalledTimes(1)
	})
})
