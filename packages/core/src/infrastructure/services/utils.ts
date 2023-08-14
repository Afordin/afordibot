import { UrlSearchParams } from 'infrastructure/types/utils'

export class Utils {
	public urlSearchParams(baseUrl: string, params: UrlSearchParams) {
		const url = new URL(baseUrl)
		const arrayParams = Object.entries(params)
		arrayParams.forEach(([key, value]) => {
			if (value) url.searchParams.append(key, value.toString())
		})
		return url.toString()
	}
}
