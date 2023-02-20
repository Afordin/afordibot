import { FirebaseTypes } from 'types/Firebase.types'

export const getRandomFlower = (): FirebaseTypes.Aflor => {
	const flowers: FirebaseTypes.Aflor[] = ['🌺', '🌻', '🌹', '🥀', '🌷', '🌼', '🌸', '💐', '🍄']
	const randomIndex = Math.floor(Math.random() * flowers.length)
	return flowers[randomIndex]
}
