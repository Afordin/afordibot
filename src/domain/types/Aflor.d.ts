import type { Aflor } from 'domain/types/Emoji'

export interface AflorValue extends Partial<Record<Aflor, number>> {
	total: number
}
