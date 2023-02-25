import { RegExp } from 'utils/regExp'

export interface ValidateMessages {
	jolinesCommand: boolean
	jolinesUser: boolean
	jolin: boolean
}

export const validateMessages = (message: string) => {
	const jolinesCommand = message === '!jolines'
	const jolinesUser = RegExp.jolinesUser.test(message)
	const jolin = message.includes('jolin') && !message.includes('jolines')

	return { jolinesCommand, jolinesUser, jolin }
}
