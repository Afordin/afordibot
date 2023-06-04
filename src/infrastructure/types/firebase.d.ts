import { database } from 'firebase-admin'

export interface DbHandler {
	getInstance: () => database.Database
	disconnect: () => void
}

export interface DocumentParser<T, U> {
	toDomain: (document: T) => U
	toDocument: (entity: U) => T
}
