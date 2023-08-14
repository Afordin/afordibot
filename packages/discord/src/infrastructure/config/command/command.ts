import { Option } from 'infrastructure/config/option'
import { InvalidCommandError, InvalidCommandMessages } from './errors/invalidCommandError'
import type { CommandConfig } from 'infrastructure/types/config'

export class Command implements CommandConfig {
	private _name: string
	private _description: string
	private _options: Option[]

	constructor({ name, description, options = [] }: PartialOmit<CommandConfig, 'options'>) {
		this._assertName(name)
		this._assertDescription(description)
		this._assertOptions(options)
		this._name = name
		this._description = description
		this._options = options
	}

	public get name(): string {
		return this._name
	}

	public get description(): string {
		return this._description
	}

	public get options(): Option[] {
		return this._options
	}

	private _assertName(name: string) {
		this._assertNameType(name)
		this._assertNameLength(name)
	}

	private _assertDescription(description: string) {
		this._assertDescriptionType(description)
		this._assertDescriptionLength(description)
	}

	private _assertOptions(options: Option[]) {
		this._assertOptionsType(options)
		this._assertOptionsInstances(options)
	}

	private _assertNameType(name: unknown) {
		if (typeof name !== 'string') {
			throw new InvalidCommandError(InvalidCommandMessages.INVALID_NAME)
		}
	}

	private _assertNameLength(name: string) {
		if (name.length < 4) {
			throw new InvalidCommandError(InvalidCommandMessages.TOO_SHORT_NAME)
		} else if (name.length > 10) {
			throw new InvalidCommandError(InvalidCommandMessages.TOO_LONG_NAME)
		}
	}

	private _assertDescriptionType(description: unknown) {
		if (typeof description !== 'string') {
			throw new InvalidCommandError(InvalidCommandMessages.INVALID_DESCRIPTION)
		}
	}

	private _assertDescriptionLength(description: string) {
		if (description.length < 10) {
			throw new InvalidCommandError(InvalidCommandMessages.TOO_SHORT_DESCRIPTION)
		}
	}

	private _assertOptionsType(options: unknown) {
		if (!Array.isArray(options) && options !== undefined) {
			throw new InvalidCommandError(InvalidCommandMessages.INVALID_OPTIONS)
		}
	}

	private _assertOptionsInstances(options: unknown[]) {
		options.forEach((option) => {
			if (!(option instanceof Option)) {
				throw new InvalidCommandError(InvalidCommandMessages.INVALID_OPTIONS)
			}
		})
	}
}
