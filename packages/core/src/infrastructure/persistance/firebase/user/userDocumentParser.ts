import { User } from 'domain/user/User'
import type { UserDocumentParser } from 'infrastructure/types/userRepository'

export const userDocumentParser = (): UserDocumentParser => {
	return {
		toDomain: ({ username, aflores, jolines }) => {
			return new User({
				username,
				aflores,
				jolines,
			})
		},
		toDocument: ({ username, aflores, jolines }) => {
			return {
				username,
				aflores,
				jolines,
			}
		},
	}
}
