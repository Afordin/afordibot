export class Utils {
	public getRandomItem<T>(items: T[]): T {
		return items[Math.floor(Math.random() * items.length)]
	}
}
