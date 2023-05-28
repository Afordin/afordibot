// @ts-nocheck
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { CommandValidator } from 'infrastructure/services/commandValidator'

describe('Instantiate command validator', () => {
	let commandValidator: CommandValidator

	beforeEach(() => {
		commandValidator = new CommandValidator()
	})

	test('should be a function', () => {
		expect(typeof CommandValidator).toBe('function')
	})

	test('should return an object with the expected methods', () => {
		expect(typeof commandValidator).toBe('object')
		expect(typeof commandValidator.isJolin).toBe('function')
		expect(typeof commandValidator.isUserJolines).toBe('function')
		expect(typeof commandValidator.isUserAflor).toBe('function')
		expect(typeof commandValidator.isChannelJolines).toBe('function')
		expect(typeof commandValidator.isChannelAflores).toBe('function')
	})

	test('isJolin method should validate expected messages correctly', () => {
		expect(commandValidator.isJolin('jolin')).toBe(true)
		expect(commandValidator.isJolin(' jolin ')).toBe(true)
		expect(commandValidator.isJolin('jolines')).toBe(false)
	})

	test('isUserJolines method should validate expected messages correctly', () => {
		expect(commandValidator.isUserJolines('!jolines @user')).toBe(true)
		expect(commandValidator.isUserJolines('!jolines @use ')).toBe(false)
		expect(commandValidator.isUserJolines('!jolines @user ')).toBe(true)
		expect(commandValidator.isUserJolines('!jolines @usernamelongerthan25characters')).toBe(false)
	})

	test('isUserAflor method should validate expected messages correctly', () => {
		expect(commandValidator.isUserAflor('!aflor @user')).toBe(true)
		expect(commandValidator.isUserAflor('!aflor @use ')).toBe(false)
		expect(commandValidator.isUserAflor('!aflor @user ')).toBe(true)
		expect(commandValidator.isUserAflor('!aflor @usernamelongerthan25characters')).toBe(false)
	})

	test('isChannelJolines method should validate expected messages correctly', () => {
		expect(commandValidator.isChannelJolines('!jolines')).toBe(true)
		expect(commandValidator.isChannelJolines('!jolines ')).toBe(false)
		expect(commandValidator.isChannelJolines(' !jolines ')).toBe(false)
		expect(commandValidator.isChannelJolines('!jolines @user')).toBe(false)
		expect(commandValidator.isChannelJolines('jolines')).toBe(false)
	})

	test('isChannelAflores method should validate expected messages correctly', () => {
		expect(commandValidator.isChannelAflores('!aflores')).toBe(true)
		expect(commandValidator.isChannelAflores('!aflores ')).toBe(false)
		expect(commandValidator.isChannelAflores(' !aflores ')).toBe(false)
		expect(commandValidator.isChannelAflores('!aflores @user')).toBe(false)
		expect(commandValidator.isChannelAflores('aflores')).toBe(false)
	})
})
