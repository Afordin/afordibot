import { AfloresTypes } from 'types/Aflores.types'
import { getRandomFlower, getRandomPig } from 'utils/getRandomEmoji'

export module MessagesHandlers {
	export const getUsername = (message: string) => message.split(' ')[1].replace('@', '')

	export const totalJolines = (jolines: number) => `Llevamos ${jolines} jolines ${getRandomPig()}!`

	export const userJolines = (jolines: number, username: string) => {
		if (!jolines) return `@${username} no tiene jolines :c`
		return `@${username} lleva ${jolines} jolines ${getRandomPig()}!`
	}

	export const totalAflores = (aflores: number) => `Llevamos ${aflores} aflores ${getRandomFlower()}!`

	export const userAflor = (aflor: AfloresTypes.Aflor, fromUser: string, toUser: string) => {
		return `Toma @${toUser} una aflor ${aflor} de @${fromUser}!`
	}
}
