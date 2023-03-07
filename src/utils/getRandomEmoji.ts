import { AfloresTypes } from 'types/Aflores.types'

export type Pig = '🐷' | '🐽' | '🐖'

export const getRandomFlower = (): AfloresTypes.Aflor => {
	const flowers: AfloresTypes.Aflor[] = ['🌺', '🌻', '🌹', '🥀', '🌷', '🌼', '🌸', '💐', '🍄']
	const randomIndex = Math.floor(Math.random() * flowers.length)
	return flowers[randomIndex]
}

export const getRandomPig = (): Pig => {
	const pigs: Pig[] = ['🐷', '🐽', '🐖']
	const randomIndex = Math.floor(Math.random() * pigs.length)
	return pigs[randomIndex]
}
