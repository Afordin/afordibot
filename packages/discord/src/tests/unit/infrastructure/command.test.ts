// @ts-nocheck
import { describe, test, expect } from 'vitest'
import { Command } from 'infrastructure/config/command'
import { Option } from 'infrastructure/config/option'

describe('Instantiate command entity', () => {
	const VALID_COMMAND_WITHOUT_OPTIONS = {
		name: 'aflor',
		description: 'Gives an aflor to an user',
	}
	const VALID_COMMAND_WITH_OPTIONS = {
		name: 'aflor',
		description: 'Gives an aflor to an user',
		options: [new Option({ name: 'user', description: 'Description' })],
	}

	test('should be a function', () => {
		expect(typeof Command).toBe('function')
	})

	test('should return an object when options are not provided', () => {
		const command = new Command(VALID_COMMAND_WITHOUT_OPTIONS)
		expect(typeof command).toBe('object')
	})

	test('should return an object when options are provided', () => {
		const command = new Command(VALID_COMMAND_WITH_OPTIONS)
		expect(typeof command).toBe('object')
	})

	test('should have the expected properties when options are not provided', () => {
		const command = new Command(VALID_COMMAND_WITHOUT_OPTIONS)
		expect(command.name).not.toBeUndefined()
		expect(command.description).not.toBeUndefined()
		expect(command.options).not.toBeUndefined()
	})

	test('should have the expected properties when options are provided', () => {
		const command = new Command(VALID_COMMAND_WITH_OPTIONS)
		expect(command.name).not.toBeUndefined()
		expect(command.description).not.toBeUndefined()
		expect(command.options).not.toBeUndefined()
	})

	test('should return an object with correct properties when options are not provided', () => {
		const command = new Command(VALID_COMMAND_WITHOUT_OPTIONS)
		expect(command.name).toBe('aflor')
		expect(command.description).toBe('Gives an aflor to an user')
		expect(command.options).toEqual([])
	})

	test('should return an object with correct properties when options are provided', () => {
		const command = new Command(VALID_COMMAND_WITH_OPTIONS)
		expect(command.name).toBe('aflor')
		expect(command.description).toBe('Gives an aflor to an user')
		expect(command.options).toEqual([new Option({ name: 'user', description: 'Description' })])
	})

	test('should throw an error if name is not a string', () => {
		expect(() => new Command({ description: 'description' })).toThrow()
		expect(() => new Command({ name: 0, description: 'description' })).toThrow()
		expect(() => new Command({ name: 0n, description: 'description' })).toThrow()
		expect(() => new Command({ name: null, description: 'description' })).toThrow()
		expect(() => new Command({ name: () => {}, description: 'description' })).toThrow()
		expect(() => new Command({ name: [], description: 'description' })).toThrow()
		expect(() => new Command({ name: {}, description: 'description' })).toThrow()
	})

	test('should throw an error if description is not a string', () => {
		expect(() => new Command({ name: 'name' })).toThrow()
		expect(() => new Command({ name: 'name', description: 0 })).toThrow()
		expect(() => new Command({ name: 'name', description: 0n })).toThrow()
		expect(() => new Command({ name: 'name', description: null })).toThrow()
		expect(() => new Command({ name: 'name', description: () => {} })).toThrow()
		expect(() => new Command({ name: 'name', description: [] })).toThrow()
		expect(() => new Command({ name: 'name', description: {} })).toThrow()
	})

	test('should throw an error if name has less than 4 characters', () => {
		expect(() => new Command({ name: 'a', description: 'description' })).toThrow()
		expect(() => new Command({ name: 'ab', description: 'description' })).toThrow()
		expect(() => new Command({ name: 'abc', description: 'description' })).toThrow()
		expect(() => new Command({ name: 'abcd', description: 'description' })).not.toThrow()
	})

	test('should throw an error if name has more than 10 characters', () => {
		expect(() => new Command({ name: '0123456789ab', description: 'description' })).toThrow()
		expect(() => new Command({ name: '0123456789a', description: 'description' })).toThrow()
		expect(() => new Command({ name: '0123456789', description: 'description' })).not.toThrow()
		expect(() => new Command({ name: '012345678', description: 'description' })).not.toThrow()
	})

	test('should throw an error if description has less than 10 characters', () => {
		expect(() => new Command({ name: 'name', description: '01234567' })).toThrow()
		expect(() => new Command({ name: 'name', description: '012345678' })).toThrow()
		expect(() => new Command({ name: 'name', description: '0123456789' })).not.toThrow()
		expect(() => new Command({ name: 'name', description: '0123456789a' })).not.toThrow()
	})

	test('should throw an error if options is not an array of Option instances', () => {
		expect(() => new Command(VALID_COMMAND_WITHOUT_OPTIONS)).not.toThrow()
		expect(() => new Command(VALID_COMMAND_WITH_OPTIONS)).not.toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [] })).not.toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: 'options' })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: 5 })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: 5n })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: null })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: {} })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [{}] })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [0] })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [0n] })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [null] })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [() => {}] })).toThrow()
		expect(() => new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options: [[]] })).toThrow()
		expect(() => {
			const options = [
				new Option({ name: 'user', description: 'Description' }),
				new Option({ name: 'user', description: 'Description' }),
			]
			new Command({ ...VALID_COMMAND_WITHOUT_OPTIONS, options })
		}).not.toThrow()
	})
})
