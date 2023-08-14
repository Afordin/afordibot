import type { GetUserJolinesResponseConstructor } from 'application/types/getUserJolines'
import type { Pig } from 'domain/types/Emoji'

export class GetUserJolinesResponse {
	private _username: string
	private _jolines: number
	private _pig: Pig

	constructor({ username, jolines, pig }: GetUserJolinesResponseConstructor) {
		this._username = username
		this._jolines = jolines
		this._pig = pig
	}

	public getMessage() {
		if (this._jolines === 0) return `@${this._username} no tiene jolines :c`
		else if (this._jolines === 1) return `@${this._username} lleva ${this._jolines} jolín ${this._pig}!`
		return `@${this._username} lleva ${this._jolines} jolines ${this._pig}!`
	}

	public getJolines() {
		return this._jolines
	}

	public getPig() {
		return this._pig
	}
}
