import { DateTypes } from 'types/Date.types'

export namespace FirebaseTypes {
	// Jolin Types
	export type Jolin = number

	export interface JolinUsers {
		[key: string]: Jolin
	}

	export interface TotalJolines {
		total: Jolin
		users: JolinUsers
	}

	export interface Jolines {
		total: Jolin
		users: JolinUsers
		dates: DateTypes.DateObject<TotalJolines>
	}

	// Aflor Types
	export type Aflor = '🌺' | '🌻' | '🌹' | '🥀' | '🌷' | '🌼' | '🌸' | '💐' | '🍄'

	export interface AflorValues {
		[key: Aflor]: number
	}

	export interface AflorUsers {
		[key: string]: AflorValues
	}

	export interface TotalAflores {
		total: AflorValues
		users: AflorUsers
	}

	export interface Aflores {
		total: AflorValues
		users: AflorUsers
		dates: DateTypes.DateObject<TotalAflores>
	}

	// Realtime Database Types
	export interface FirebaseDatabase {
		jolines: Jolines
		aflores: Aflores
	}
}
