import { FirebaseTypes } from 'types/Firebase.types'

export type Pig = '🐷' | '🐽' | '🐖'

export const getRandomFlower = (): FirebaseTypes.Aflor => {
	const flowers: FirebaseTypes.Aflor[] = ['🌺', '🌻', '🌹', '🥀', '🌷', '🌼', '🌸', '💐', '🍄']
	const randomIndex = Math.floor(Math.random() * flowers.length)
	return flowers[randomIndex]
}

export const getRandomPig = (): Pig => {
	const pigs: Pig[] = ['🐷', '🐽', '🐖']
	const randomIndex = Math.floor(Math.random() * pigs.length)
	return pigs[randomIndex]
}