import { RegExp } from 'utils/regExp'

export interface ValidateMessages {
	jolinesCommand: boolean
	jolinesUser: boolean
	jolin: boolean
	aflorCommand: boolean
	aflorUser: boolean
}

export const validateMessages = (message: string): ValidateMessages => {
	const jolinesCommand = message === '!jolines'
	const jolinesUser = RegExp.jolinesUser.test(message)
	const jolin = message.includes('jolin') && !message.includes('jolines')

	const aflorCommand = message === '!aflores'
	const aflorUser = RegExp.alforUser.test(message)

	return { jolinesCommand, jolinesUser, jolin, aflorCommand, aflorUser }
}
