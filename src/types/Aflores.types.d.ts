export namespace AfloresTypes {
	export type Aflor = '🌺' | '🌻' | '🌹' | '🥀' | '🌷' | '🌼' | '🌸' | '💐' | '🍄'

	export interface Aflores {
		total: number
		[key: Aflor]: number
	}

	export interface AfloresUser {
		aflores?: Aflores
	}
}
