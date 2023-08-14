import { OptionConfig } from 'infrastructure/types/config'
import { InvalidOptionError, InvalidOptionMessages } from './errors/invalidOptionError'

export class Option implements OptionConfig {
	private _name: string
	private _description?: string

	constructor({ name, description }: OptionConfig) {
		this._assertName(name)
		this._assertDescription(description)
		this._name = name
		this._description = description
	}

	public get name() {
		return this._name
	}

	public get description() {
		return this._description
	}

	private _assertName(name: string) {
		this._assertNameType(name)
		this._assertNameLength(name)
	}

	private _assertDescription(description?: string) {
		this._assertDescriptionType(description)
		this._assertDescriptionLength(description)
	}

	private _assertNameType(name: string) {
		if (typeof name !== 'string') {
			throw new InvalidOptionError(InvalidOptionMessages.INVALID_NAME)
		}
	}

	private _assertNameLength(name: string) {
		if (name.length < 4) {
			throw new InvalidOptionError(InvalidOptionMessages.TOO_SHORT_NAME)
		} else if (name.length > 10) {
			throw new InvalidOptionError(InvalidOptionMessages.TOO_LONG_NAME)
		}
	}

	private _assertDescriptionType(description?: string) {
		if (typeof description !== 'string' && description !== undefined) {
			throw new InvalidOptionError(InvalidOptionMessages.INVALID_DESCRIPTION)
		}
	}

	private _assertDescriptionLength(description?: string) {
		if (typeof description === 'string' && description.length < 10) {
			throw new InvalidOptionError(InvalidOptionMessages.TOO_SHORT_DESCRIPTION)
		}
	}
}
