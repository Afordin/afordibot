import { database } from 'firebase-admin'

export interface DbHandler {
	getInstance: () => database.Database
	disconnect: () => void
}

/**
 * Represents a document parser that provides functions for converting between a domain entity and a database document.
 *
 * @interface DocumentParser
 * @template T - Database document type.
 * @template U - Domain entity type.
 * @property {function} toDomain - Converts a database document to a domain entity.
 * @property {function} toDocument - Converts a domain entity to a database document.
 */
export interface DocumentParser<T, U> {
	toDomain: (document: T) => U
	toDocument: (entity: U) => T
}
