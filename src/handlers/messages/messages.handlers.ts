import { getRandomFlower } from 'utils/getRandomFlower'

export module MessagesHandlers {
	export const getUsername = (message: string) => message.split(' ')[1].replace('@', '')

	export const totalJolines = (jolines: number) => `Llevamos ${jolines} jolines ${getRandomFlower()}!`

	export const userJolines = (jolines: number, username: string) => {
		if (!jolines) return `@${username} no tiene jolines :c`
		return `@${username} lleva ${jolines} jolines ${getRandomFlower()}!`
	}
}
