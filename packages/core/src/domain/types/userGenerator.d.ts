import { User } from 'domain/user/User'

export interface Generate {
	username: string
}

export interface GenerateIfNotExists extends Generate {
	user: User | null
}

export interface UserGenerator {
	generate: (params: Generate) => User
	generateIfNotExists: (params: GenerateIfNotExists) => User
}
