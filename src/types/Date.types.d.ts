export namespace DateTypes {
	export type DateNumber = `${number}${number}`
	export type DateYear = `${DateNumber}${DateNumber}`
	export type DateKey = `${DateNumber}-${DateNumber}-${DateYear}`

	export interface DateObject<T> {
		[key: DateKey]: T
	}
}
