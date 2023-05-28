import { Generate, GenerateIfNotExists, UserGenerator } from 'domain/types/userGenerator'
import { User } from 'domain/user/User'

export class UserGeneratorService implements UserGenerator {
	public generate({ username }: Generate) {
		return new User({
			username,
			jolines: 0,
			aflores: {
				total: 0,
			},
		})
	}

	public generateIfNotExists({ user, username }: GenerateIfNotExists) {
		if (user) return user
		return this.generate({ username })
	}
}
