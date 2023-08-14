// @ts-nocheck
import { describe, test, expect, beforeEach } from 'vitest'
import { CommandService } from 'infrastructure/services/command'

describe('Instantiate command validator', () => {
	let commandService: CommandService

	beforeEach(() => {
		commandService = new CommandService()
	})

	test('should be a function', () => {
		expect(typeof CommandService).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof commandService).toBe('object')
		expect(typeof commandService.isJolin).toBe('function')
		expect(typeof commandService.isUserJolines).toBe('function')
		expect(typeof commandService.isUserAflor).toBe('function')
		expect(typeof commandService.isChannelJolines).toBe('function')
		expect(typeof commandService.isChannelAflores).toBe('function')
	})

	test('isJolin method should validate expected messages correctly', () => {
		expect(commandService.isJolin('jolin')).toBe(true)
		expect(commandService.isJolin(' jolin ')).toBe(true)
		expect(commandService.isJolin('jolines')).toBe(false)
	})

	test('isUserJolines method should validate expected messages correctly', () => {
		expect(commandService.isUserJolines('!jolines @user')).toBe(true)
		expect(commandService.isUserJolines('!jolines @use ')).toBe(false)
		expect(commandService.isUserJolines('!jolines @user ')).toBe(true)
		expect(commandService.isUserJolines('!jolines @usernamelongerthan25characters')).toBe(false)
	})

	test('isUserAflor method should validate expected messages correctly', () => {
		expect(commandService.isUserAflor('!aflor @user')).toBe(true)
		expect(commandService.isUserAflor('!aflor @use ')).toBe(false)
		expect(commandService.isUserAflor('!aflor @user ')).toBe(true)
		expect(commandService.isUserAflor('!aflor @usernamelongerthan25characters')).toBe(false)
	})

	test('isChannelJolines method should validate expected messages correctly', () => {
		expect(commandService.isChannelJolines('!jolines')).toBe(true)
		expect(commandService.isChannelJolines('!jolines ')).toBe(false)
		expect(commandService.isChannelJolines(' !jolines ')).toBe(false)
		expect(commandService.isChannelJolines('!jolines @user')).toBe(false)
		expect(commandService.isChannelJolines('jolines')).toBe(false)
	})

	test('isChannelAflores method should validate expected messages correctly', () => {
		expect(commandService.isChannelAflores('!aflores')).toBe(true)
		expect(commandService.isChannelAflores('!aflores ')).toBe(false)
		expect(commandService.isChannelAflores(' !aflores ')).toBe(false)
		expect(commandService.isChannelAflores('!aflores @user')).toBe(false)
		expect(commandService.isChannelAflores('aflores')).toBe(false)
	})
})
