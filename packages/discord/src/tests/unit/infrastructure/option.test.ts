// @ts-nocheck
import { describe, test, expect } from 'vitest'
import { Option } from 'infrastructure/config/option'

describe('Instantiate option config object', () => {
	const VALID_OPTION_WITHOUT_DESCRIPTION = { name: 'name' }
	const VALID_OPTION_WITH_DESCRIPTION = { name: 'name', description: 'description' }

	test('should be a function', () => {
		expect(typeof Option).toBe('function')
	})

	test('should return an object when description is not provided', () => {
		const option = new Option(VALID_OPTION_WITHOUT_DESCRIPTION)
		expect(typeof option).toBe('object')
	})

	test('should return an object when description is provided', () => {
		const option = new Option(VALID_OPTION_WITH_DESCRIPTION)
		expect(typeof option).toBe('object')
	})

	test('should return an object with the correct properties when description is not provided', () => {
		const option = new Option(VALID_OPTION_WITHOUT_DESCRIPTION)
		expect(option.name).toBe('name')
		expect(option.description).toBeUndefined()
	})

	test('should return an object with the correct properties when description is provided', () => {
		const option = new Option(VALID_OPTION_WITH_DESCRIPTION)
		expect(option.name).toBe('name')
		expect(option.description).toBe('description')
	})

	test('should throw an error if name is not a string', () => {
		expect(() => new Option({})).toThrow()
		expect(() => new Option({ name: 0 })).toThrow()
		expect(() => new Option({ name: 0n })).toThrow()
		expect(() => new Option({ name: null })).toThrow()
		expect(() => new Option({ name: () => {} })).toThrow()
		expect(() => new Option({ name: [] })).toThrow()
		expect(() => new Option({ name: {} })).toThrow()
	})

	test('should throw an error if trying to change the name', () => {
		expect(() => {
			const option = new Option(VALID_OPTION_WITHOUT_DESCRIPTION)
			option.name = 'new name'
		}).toThrow()
	})

	test('should throw an error if name has less than 4 characters', () => {
		expect(() => new Option({ name: 'a' })).toThrow()
		expect(() => new Option({ name: 'abc' })).toThrow()
		expect(() => new Option({ name: 'abcd' })).not.toThrow()
	})

	test('should throw an error if name has more than 10 characters', () => {
		expect(() => new Option({ name: '0123456789ab' })).toThrow()
		expect(() => new Option({ name: '0123456789a' })).toThrow()
		expect(() => new Option({ name: '0123456789' })).not.toThrow()
	})

	test('should throw an error if description is not a string when it is provided', () => {
		expect(() => new Option({ name: 'name' })).not.toThrow()
		expect(() => new Option({ name: 'name', description: 0 })).toThrow()
		expect(() => new Option({ name: 'name', description: 0n })).toThrow()
		expect(() => new Option({ name: 'name', description: null })).toThrow()
		expect(() => new Option({ name: 'name', description: () => {} })).toThrow()
		expect(() => new Option({ name: 'name', description: [] })).toThrow()
		expect(() => new Option({ name: 'name', description: {} })).toThrow()
	})

	test('should throw an error if trying to change the description', () => {
		expect(() => {
			const option = new Option(VALID_OPTION_WITHOUT_DESCRIPTION)
			option.description = 'new description'
		}).toThrow()
		expect(() => {
			const option = new Option(VALID_OPTION_WITH_DESCRIPTION)
			option.description = 'new description'
		}).toThrow()
	})

	test('should throw an error if description has less than 10 characters when it is provided', () => {
		expect(() => new Option({ name: 'name', description: '0123456789a' })).not.toThrow()
		expect(() => new Option({ name: 'name', description: '0123456789' })).not.toThrow()
		expect(() => new Option({ name: 'name', description: '012345678' })).toThrow()
	})
})
