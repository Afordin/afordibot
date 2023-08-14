import { InvalidUserError, InvalidUserMessages } from './errors/invalidUserError'
import type { AflorValue } from 'domain/types/Aflor'
import type { UserEntity } from 'domain/types/User'
import type { Aflor } from 'domain/types/Emoji'

export class User implements UserEntity {
	private _username: string
	private _jolines: number
	private _aflores: AflorValue

	constructor({ username, jolines, aflores }: UserEntity) {
		this._assertUsername(username)
		this._assertJolines(jolines)
		this._assertAflores(aflores)
		this._username = username
		this._jolines = jolines
		this._aflores = aflores
	}

	get username(): string {
		return this._username
	}

	get jolines(): number {
		return this._jolines
	}

	get aflores(): AflorValue {
		return this._aflores
	}

	set username(username: string) {
		this._assertUsername(username)
		this._username = username
	}

	set jolines(jolines: number) {
		this._assertJolines(jolines)
		this._jolines = jolines
	}

	set aflores(aflores: AflorValue) {
		this._assertAflores(aflores)
		this._aflores = aflores
	}

	private _assertUsername(username: string) {
		if (typeof username !== 'string' || username.length < 4 || username.length > 25) {
			throw new InvalidUserError(InvalidUserMessages.INVALID_USERNAME)
		}
	}

	private _assertJolines(jolines: number) {
		if (!this._isPositiveInteger(jolines)) {
			throw new InvalidUserError(InvalidUserMessages.INVALID_JOLINES)
		}
	}

	private _assertAflores(aflores: AflorValue) {
		if (typeof aflores !== 'object' || !this._isPositiveInteger(aflores.total)) {
			throw new InvalidUserError(InvalidUserMessages.INVALID_AFLORES)
		}
	}

	private _isPositiveInteger(value: number) {
		return typeof value === 'number' && Number.isFinite(value) && Number.isInteger(value) && value >= 0
	}

	public incrementJolines() {
		this._jolines++
	}

	public incrementAflores(aflor: Aflor) {
		this._aflores.total++
		if (!this._aflores[aflor]) this._aflores[aflor] = 1
		else this._aflores[aflor]!++
	}
}
