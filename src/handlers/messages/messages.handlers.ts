import { FirebaseTypes } from 'types/Firebase.types'
import { getRandomFlower, getRandomPig } from 'utils/getRandomEmoji'

export module MessagesHandlers {
	export const getUsername = (message: string) => message.split(' ')[1].replace('@', '')

	export const totalJolines = (jolines: number) => `Llevamos ${jolines} jolines ${getRandomPig()}!`

	export const userJolines = (jolines: number, username: string) => {
		if (!jolines) return `@${username} no tiene jolines :c`
		return `@${username} lleva ${jolines} jolines ${getRandomPig()}!`
	}

	export const totalAflores = (aflores: FirebaseTypes.AflorValues) => {
		const total = Object.values(aflores).reduce((acc, curr) => acc + curr, 0)
		return `Llevamos ${total} aflores ${getRandomFlower()}!`
	}

	export const userAflor = (aflor: FirebaseTypes.Aflor, fromUser: string, toUser: string) => {
		return `Toma @${toUser} una aflor ${aflor} de @${fromUser}!`
	}
}
