import { database } from 'firebase-admin'

export interface DbHandler {
	getInstance: () => database.Database
	disconnect: () => void
}
